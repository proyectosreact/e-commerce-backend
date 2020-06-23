const Category = require("../models/category");
const {
  validationResult
} = require("express-validator");
const category = require("../models/category");
const {
  identity
} = require("lodash");

exports.createSubCategory = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  const subCategory = req.body;
  const
    //Utilizacion de req.query.#### pues determina hacer  una consulta con un body  en el post o en el put
    IdCategory = req.query.IdCategory;

  let existsubcategory = await Category.findById(IdCategory, (err, category) => {
    if (err) {
      return res.status(500).json({
        message: 'err this server'
      });
    }

  })

  console.log(sub);
  if (existsubcategory) {
    return res.status(400).json({
      message: 'This subcategory exist'
    })
  }
  Category.findByIdAndUpdate(
    IdCategory, {
      $push: {
        subCategory: subCategory,
      },
    }, {
      strict: false,
    },
    (err, managerparent) => {
      if (err) {
        return res.status(500).json({
          message: "this error",
        });
      }
      console.log("este es el final")
      return res.status(200).json({
        subCategory,
      });
    }
  );
}
/*
exports.querySubCategoryByIdCategory = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    })
  }
  const IdCategory = req.params.IdCategory;
  Category.findById(IdCategory, (err, category) => {
    if (err) {
      return res.status(500).json({
        message: `Error this petition ${err}`
      })
    }
    if (!category) {
      return res.status(404).json({
        mesage: 'This cateogry not Exist'
      })
    }
    let {
      subcateogys
    } = category.subCategory
    console.log(subcateogys)
    res.status(200).json({
      subcategory: category.subCategory
    })
  })
}*/
exports.querySubCategoryByIdCategory = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    })
  }
  const IdCategory = req.params.IdCategory;
  Category.findOne({
    _id: IdCategory
  }).select('subCategory').populate('name').exec(function (err, category) {
    if (err) {
      res.status(5000).json({
        message: 'error'
      })
    }
  })
}