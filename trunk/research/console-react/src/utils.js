export const LanguageOptions = {
    en: "English",
    zh: "简体中文"
}

/**
 * padding the output.
 * padding(3, 5, '0') is 00003
 * padding(3, 5, 'x') is xxxx3
 * @see http://blog.csdn.net/win_lin/article/details/12065413
 */
function padding(number, length, prefix) {
    if(String(number).length >= length){
        return String(number);
    }
    return padding(prefix+number, length, prefix);
}

/**
 * format relative seconds to HH:MM:SS,
 * for example, 210s formated to 00:03:30
 * @see: http://blog.csdn.net/win_lin/article/details/17994347
 * @usage relative_seconds_to_HHMMSS(210)
 */
function relative_seconds_to_HHMMSS(seconds){
    var date = new Date();
    date.setTime(Number(seconds) * 1000);

    var ret = padding(date.getUTCHours(), 2, '0')
        + ":" + padding(date.getUTCMinutes(), 2, '0')
        + ":" + padding(date.getUTCSeconds(), 2, '0');

    return ret;
}

export function console_filter_time(seconds) {

    var s = "";
    if (seconds > 3600 * 24) {
        s = Number(seconds / 3600 / 24).toFixed(0) + "天 ";
        seconds = seconds % (3600 * 24);
    }
    s += relative_seconds_to_HHMMSS(seconds);
    return s;
}

export function console_filter_percentf(v) {
    return Number(v * 100).toFixed(2) + "%";
}

export function console_filter_percentf2(v) {
    return Number(v * 100).toFixed(0) + "%";
}

export function console_filter_filesize_k2(v) {
    // PB
    if (v > 1024 * 1024 * 1024 * 1024) {
        return Number(v / 1024.0 / 1024 / 1024 / 1024).toFixed(0) + "PB";
    }
    // TB
    if (v > 1024 * 1024 * 1024) {
        return Number(v / 1024.0 / 1024 / 1024).toFixed(0) + "TB";
    }
    // GB
    if (v > 1024 * 1024) {
        return Number(v / 1024.0 / 1024).toFixed(0) + "GB";
    }
    // MB
    if (v > 1024) {
        return Number(v / 1024.0).toFixed(0) + "MB";
    }
    return Number(v).toFixed(0) + "KB";
}

export function console_filter_bitrate_k2(v) {
    // PB
    if (v > 1000 * 1000 * 1000 * 1000) {
        return Number(v / 1000.0 / 1000 / 1000 / 1000).toFixed(0) + "Pbps";
    }
    // TB
    if (v > 1000 * 1000 * 1000) {
        return Number(v / 1000.0 / 1000 / 1000).toFixed(0) + "Tbps";
    }
    // GB
    if (v > 1000 * 1000) {
        return Number(v / 1000.0 / 1000).toFixed(0) + "Gbps";
    }
    // MB
    if (v > 1000) {
        return Number(v / 1000.0).toFixed(0) + "Mbps";
    }
    return Number(v).toFixed(0) + "Kbps";
}

export function console_filter_number(v) {
    return Number(v).toFixed(2);
}

export function console_filter_bitrate_k(v) {
    // PB
    if (v > 1000 * 1000 * 1000 * 1000) {
        return Number(v / 1000.0 / 1000 / 1000 / 1000).toFixed(2) + "Pbps";
    }
    // TB
    if (v > 1000 * 1000 * 1000) {
        return Number(v / 1000.0 / 1000 / 1000).toFixed(2) + "Tbps";
    }
    // GB
    if (v > 1000 * 1000) {
        return Number(v / 1000.0 / 1000).toFixed(2) + "Gbps";
    }
    // MB
    if (v > 1000) {
        return Number(v / 1000.0).toFixed(2) + "Mbps";
    }
    return Number(v).toFixed(2) + "Kbps";
}

export function console_filter_filerate_k2(v) {
    // PB
    if (v > 1024 * 1024 * 1024 * 1024) {
        return Number(v / 1024.0 / 1024 / 1024 / 1024).toFixed(0) + "PBps";
    }
    // TB
    if (v > 1024 * 1024 * 1024) {
        return Number(v / 1024.0 / 1024 / 1024).toFixed(0) + "TBps";
    }
    // GB
    if (v > 1024 * 1024) {
        return Number(v / 1024.0 / 1024).toFixed(0) + "GBps";
    }
    // MB
    if (v > 1024) {
        return Number(v / 1024.0).toFixed(0) + "MBps";
    }
    return Number(v).toFixed(0) + "KBps";
}

export function console_filter_yesno(v) {
    return v? "是":"否";
}

export function console_filter_enabled(v) {
    return v? "开启":"关闭";
}