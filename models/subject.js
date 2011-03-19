var subjectCounter = 1;

Subject = function(){};
Subject.prototype.dummyData = [];

Subject.prototype.findAll = function(callback) {
	callback(null, this.dummyData);
};

Subject.prototype.findById = function(id, callback) {
	var result = null;
	var len = this.dummyData.length;
	for (; i < len; i++) {
		if (this.dummyData[i]._id == id) {
			result = this.dummyData[i];
			break;
		}
	}
	callback(null, result);
}

Subject.prototype.save = function(subjects, callback) {
	var subject = null;
	
	var len = subjects.length;
	for(; i < len; i++) {
		subject = subjects[i];
		subject._id = subjectCounter++;
		if (!subject.notes) {
			subject.notes = [];
		}
		this.dummyData.push(subject);
	}
	
	callback(null, subjects);
}

new Subject().save([
	{name: 'Fred Jean', rating: 10.0, notes: [{author: 'Eric Wendelin', note: 'JRubyist'}]},
	{name: 'John Doe', rating: 5.4}
], function(error, subjects){});

exports.Subject = Subject;