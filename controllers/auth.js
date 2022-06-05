//if login dont works properly

exports.login = (req, res) => {
    console.log(req.body);
    res.render("homepage")
}