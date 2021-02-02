const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Merca123:Merca123@mercadology.31zry.mongodb.net/Merca?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true

})
    .then(() => console.log('DB is connected'))
    .catch(e => console.log(e));
