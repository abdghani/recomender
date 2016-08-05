var data = {
	ip:'localhost',
	port:'2000',
	"mongooseUrl":process.env.OPENSHIFT_MONGODB_DB_URL||'mongodb://localhost/movies',
}
module.exports = data