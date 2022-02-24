const dashboardTemplate = (data) => {
  return `
    <html>
        <body>
            <div>LOGGED IN SUCCESSFULLY!</div>
            <br />
            <div><a href="/download/mycontacts.json" target="_self">Download Contacts</a></div>
            <br />
            <div><a href="/view/mycontacts.json" target="_self">View Contacts</a><div>
        </body>
    </html>`;
};

module.exports = {
  dashboardTemplate,
};
