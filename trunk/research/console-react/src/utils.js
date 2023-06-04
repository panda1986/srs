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

export function console_filter_video(v) {
    // set default value for SRS2.
    v.width = v.width? v.width : 0;
    v.height = v.height? v.height : 0;

    return v? v.codec + "/" + v.profile + "/" + v.level + "/" + v.width + "x" + v.height : "无视频";
}

export function console_filter_audio(v) {
    return v? v.codec + "/" + v.sample_rate + "/" + (v.channel === 2? "Stereo":"Mono") + "/" + v.profile : "无音频";
}

export function console_filter_less(v) {
    return v? (v.length > 15? v.substr(0, 15) + "...":v):v;
}

export function console_filter_has_stream(v) {
    return v? "有流":"无流";
}

export function console_filter_preview_url(v) {
    console.log(window.location);
    let sc_server = {
        schema: "http",
        host: window.location.hostname,
        port: 1985,
        rtmp: [1935],
        http: [8080]
    }
    // http://localhost:8080/players/srs_player.html?vhost=__defaultVhost__&app=live&stream=livestream.flv&server=localhost&port=8080&autostart=true&schema=http
    // http://ossrs.net/players/srs_player.html?vhost=__defaultVhost__&app=live&stream=livestream.flv&server=localhost:3000&port=8080&autostart=true&schema=http

    var page = sc_server.schema + `://${sc_server.host}:${sc_server.http}/players/srs_player.html`;
    var http = sc_server.http[sc_server.http.length - 1];
    var query = "vhost=" + v.owner.name + "&app=" + v.app + "&stream=" + v.name + ".flv";
    query += "&server=" + sc_server.host +"&port=" + http + "&autostart=true&schema=" + sc_server.schema;
    return v? page+"?" + query:"javascript:void(0)";
}

/**
 * get the specified element from array
 * @param arr the array to find.
 * @param elem_or_function the element value or compare function.
 * @returns the matched elem; otherwise null.
 * for example,
 *      arr = [10, 15, 20, 30, 20, 40]
 *      system_array_get(arr, 10) // 10
 *      system_array_get(arr, 11) // null
 *      system_array_get(arr, function(elem){return elem == 30;}); // 30
 *      system_array_get(arr, function(elem){return elem == 60;}); // null
 */
export function system_array_get(arr, elem_or_function) {
    for (var i = 0; i < arr.length; i++) {
        if (typeof elem_or_function == "function") {
            if (elem_or_function(arr[i])) {
                return arr[i];
            }
        } else {
            if (elem_or_function === arr[i]) {
                return arr[i];
            }
        }
    }
    return null;
}