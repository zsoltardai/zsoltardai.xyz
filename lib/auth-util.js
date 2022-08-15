const bcyrpt = require('bcryptjs');

export function hash(text) {
    const salt = bcyrpt.genSaltSync(10);
    return bcyrpt.hashSync(text, salt);
}

export function verify(password, hash) {
    return bcyrpt.compareSync(password, hash);
}
