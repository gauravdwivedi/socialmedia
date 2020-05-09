const queue = require('../config/kue');

const commentsMailer = require('../mailers/comment_mailer');

queue.process('emails', function (job, done) {
    console.log('emails worker is processing a job', job.data);

    commentsMailer.newComment(job.data);

    done();
})