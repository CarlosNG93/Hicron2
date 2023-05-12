const express = require("express");
const router = express.Router();
const Joi = require("joi");

const validateRequest = require("_middleware/validate-request");
const vacationService = require("./vacations.service");
const authorize = require("_middleware/authorize");
const Role = require("_helpers/role");

router.get("/", authorize(), getAll);
router.get("/:id", authorize(), getById);
router.post("/", authorize(), createSchema, create);
router.put("/:id", authorize(), updateSchema, update);
router.delete("/:id", authorize(), _delete);


function getAll(req, res, next) {
	  vacationService
	.getAll()
	.then((vacations) => res.json(vacations))
	.catch(next);
}

function getById(req, res, next) {
	vacationService
	.getById(req.params.id)
	.then((vacation) => res.json(vacation))
	.catch(next);
}

function createSchema(req, res, next) {
	const schema = Joi.object({
		start_date: Joi.date().required(),
		end_date: Joi.date().required(),
		description: Joi.string().required(),
	});
	validateRequest(req, next, schema);
}

function create(req, res, next) {
	vacationService
	.create(req.body)
	.then(() => res.json({ message: "Vacation created successfully" }))
	.catch(next);
}

function updateSchema(req, res, next) {
	const schemaRules = {
		start_date: Joi.date().empty(""),
		end_date: Joi.date().empty(""),
		description: Joi.string().empty(""),
	};
	const schema = Joi.object(schemaRules).with("start_date", "end_date");
	validateRequest(req, next, schema);
}

function update(req, res, next) {
	vacationService
	.update(req.params.id, req.body)
	.then((vacation) => res.json(vacation))
	.catch(next);
}

function _delete(req, res, next) {
	vacationService
	.delete(req.params.id)
	.then(() => res.json({ message: "Vacation deleted successfully" }))
	.catch(next);
}

module.exports = router;

