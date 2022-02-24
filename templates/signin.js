const signinTemplate = (data) => {
  return `<html><body>
    <a href="${data}" target="_self">Sign in With Google</a>
    </body></html>`;
};

module.exports = {
    signinTemplate,
}
