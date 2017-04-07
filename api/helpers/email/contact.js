
const html = ({ first, last, contactEmail, note, reason }) => (`
  <html>
    <body>
      <h1>Contact Form</h1>
      <p>First: ${first}</p>
      <p>Last: ${last}</p>
      <p>Email: ${contactEmail}</p>
      <p>Note: ${note}</p>
      <p>Reason: ${reason}</p>
    </body>
  </html>
`)

export default (props) => ({
  subject: `Someone Contacted You!`,
  html: html(props),
})
