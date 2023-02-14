const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
router.get('/', async (req, res) => {
  try {
    const allCategories = await Category.findAll({
      // include: { all: true, nested: true },
      include: [{ model: Product }],
      // include: 'goods',
    });
    res.status(200).json(allCategories);
  } catch (err) {
    res.status(500).json(err);
  }
});

// The `/api/categories/:id` endpoint
router.get('/:id', async (req, res) => {
  try {
    const aCategory = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    });

    if (!aCategory) {
      res.status(404).json({ message: `No Category found with the id=${req.params.id}` });
      return;
    }

    res.status(200).json(aCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new category
router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update a category by its `id` value\
router.put('/:id', async (req, res) => {
  try {
    const updatedCategory = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    });

    if (!updatedCategory) {
      res.status(404).json({ message: `No Category found with the id=${req.params.id}` });
      return;
    }

    res.status(200).json(updatedCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete a category by its `id` value\
router.delete('/:id', async (req, res) => {
  try {
    const delCategory = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!delCategory) {
      res.status(404).json({ message: `No Category found with the id=${req.params.id}` });
      return;
    }

    res.status(200).json(delCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
