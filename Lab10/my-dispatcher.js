let callbacks = {};

export const on = (action, cb) => {
    callbacks[action] = callbacks[action] || [];
    callbacks[action].push(cb);
}

export const off = (action, cb) => {
    callbacks[action] = (callbacks[action]||[]).filter(c => c!==cb);
}

export const trigger = (action, data) => {
    (callbacks[action]||[]).forEach(cb => cb(data) );
}
