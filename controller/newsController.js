const db = require("../models");
const { unlinkAsync } = require("../helpers/deleteFile");

const getBerita = (req, res, next) => {
  db.News.findAll()
    .then((result) => {
      res.rest.success(result);
    })
    .catch((error) => {
      next(error);
    });
};
const spesificNews = async (req, res, next) => {
  try {
    const dataBerita = await db.News.findOne({ where: { id: req.params.id } });
    if (!dataBerita)
      return res.rest.badRequest(
        `Berita dengan ID ${req.params.id} tidak ditemukan`
      );
    const dataComment = await db.Comment.findAll({
      where: { berita: req.params.id },
    });
    res.rest.success({ berita: dataBerita, comment: dataComment });
  } catch (error) {
    next(error);
  }
};
const createBerita = async (req, res, next) => {
  try {
    req.body.penulis = req.user.id;
    req.body.thumbnail = req.files ? req.files.thumbnail[0].filename : "";
    db.News.create(req.body)
      .then((result) => {
        res.rest.success(result);
      })
      .catch(async (err) => {
        if (req.thumbnail != "") await unlinkAsync(req.files.thumbnail[0].path);
        res.rest.badRequest(err);
      });
  } catch (error) {
    res.rest.badRequest(error);
  }
};
const updateBerita = async (req, res, next) => {
  try {
    let berita = await db.News.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!berita) return res.rest.badRequest("Id not found");
    berita
      .update(req.body)
      .then((result) => {
        if (result) {
          return res.rest.success("Data telah terupdate");
        }
        return res.rest.badRequest("Data gagal diupdate");
      })
      .catch((err) => {
        res.rest.badRequest(err);
      });
  } catch (error) {
    next(error);
  }
};
const deleteBerita = async (req, res, next) => {
  try {
    let berita = await db.News.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!berita)
      return res.rest.badRequest("Data yang ingin di hapus tidak ditemukan");

    await unlinkAsync(`public/thumbnail/${berita.thumbnail}`);
    await berita.destroy();
    return res.rest.success("Delete Berhasil");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getBerita,
  spesificNews,
  createBerita,
  updateBerita,
  deleteBerita,
};
