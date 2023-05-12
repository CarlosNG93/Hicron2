const jwt = require("jsonwebtoken");
const { secret } = require("config.json");
const db = require("_helpers/db");

module.exports = {
  getAllVacation,
  getVacationById,
  createVacation,
  updateVacation,
  deleteVacation: _deleteVacation,
};

async function getAllVacation() {
  return await db.Vacation.findAll();
}

async function getVacationById(id) {
  return await getVacation(id);
}

async function createVacation(params) {
  // validate
  if (await db.Vacation.findOne({ where: { start_date: params.start_date } })) {
    throw 'Vacation "' + params.start_date + '" is already taken';
  }

  // save user
  await db.Vacation.create(params);
}

async function updateVacation(id, params) {
  const vacation = await getVacation(id);

  // validate
  const start_dateChanged =
    params.start_date && vacation.start_date !== params.start_date;
  if (
    start_dateChanged &&
    (await db.Vacation.findOne({ where: { start_date: params.start_date } }))
  ) {
    throw 'Vacation "' + params.start_date + '" is already taken';
  }

  // copy params to vacation and save
  Object.assign(vacation, params);
  await vacation.save();

  return omitHash(vacation.get());
}

async function _deleteVacation(id) {
  const vacation = await getVacation(id);
  await vacation.destroy();
}
