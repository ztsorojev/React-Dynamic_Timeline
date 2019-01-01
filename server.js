const express = require('express');
const bodyParser = require('body-parser');
const apiRouter = require('./routes/api.route');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
	  message: err.message,
	  error: err
	});
  //res.render('error');
});


app.listen(port, () => console.log(`Listening on port ${port}`));