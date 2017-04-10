
const customOrderRequestHtml = ({ types, description }) => {
  if (!types) return ``
  let typeString = Object.keys(types)
    .map(x => (types[x] ? x : null))
    .filter(x => !!x)
    .join(`, `)
  if (!typeString || !description)
    return ``
  return (`
    <p>Types: ${typeString}</p>
    ${description ? `
      <p>
        Description:<br/>
        ${description}
      </p>
    ` : ``}
  `)
}

const shippingInquiryHtml = ({ trackingNumber, inquiry }) => {
  if (!trackingNumber || !inquiry)
    return ``
  return (`
    ${trackingNumber ? `<p>Tracking Number: ${trackingNumber}</p>` : ``}
    ${inquiry ? `<p>Inquiry: ${inquiry}</p>` : ``}
  `)
}

const html = ({
  first, last, email, note, reason,
  types, description, // custom order request
  trackingNumber, inquiry, // shipping inquiry
  joinNewsletter,
}) => (`
  <html>
    <body>
      <h1>Someone filled out that form.</h1>
      <p>First: ${first}</p>
      <p>Last: ${last}</p>
      <p>Email: ${email}</p>
      <p>Reason: ${reason}</p>
      <div>${customOrderRequestHtml({ types, description })}</div>
      <div>${shippingInquiryHtml({ trackingNumber, inquiry })}</div>
      ${note ? `<p>Note: ${note}</p>`: ``}
      <p>Joined Newsletter? <strong>${joinNewsletter}</strong></p>
    </body>
  </html>
`)

export default (props) => ({
  subject: `Someone Contacted You!`,
  html: html(props),
})
