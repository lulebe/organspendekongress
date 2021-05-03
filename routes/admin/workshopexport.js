const { User, Workshop } = require.main.require('./db')
const XLSX = require('xlsx')

module.exports = async (req, res) => {
  const workshops = await Workshop.findAll({order: [['slot', 'ASC'], ['title', 'ASC']]})
  const workbook = XLSX.utils.book_new()
  
  for (let i = 0; i < workshops.length; i++) {
    const workshop = workshops[i]
    XLSX.utils.book_append_sheet(workbook, await makeWorkshopSheet(workshop), workshop.slot + ' - ' + workshop.title.replace(':', ' -'))
  }
  const buf = XLSX.write(workbook, {type:'buffer', bookType: "xlsx"})
  res.status(200)
  res.setHeader('Content-Disposition', 'attachment; filename="ako_workshops_teilnehmer.xlsx"')
  res.setHeader('content-type', "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
  res.send(buf)
}

async function makeWorkshopSheet (workshop) {
  const rows = []
  rows.push([workshop.title])
  rows.push(['Slot ' + workshop.slot])
  rows.push([])
  rows.push(["Nachname", "Vorname", "E-Mail"])
  rows.push([])
  const attendees = await workshop.getUsers({order: [['lastName', 'ASC']]})
  attendees.forEach(attendee => {
    rows.push([attendee.lastName, attendee.firstName, attendee.email])
  })
  const sheet = XLSX.utils.aoa_to_sheet(rows)
  sheet['!cols'] = [{wch: 30}, {wch: 30}, {wch: 50}]
  return sheet
}