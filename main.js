const ms_in_day = 86400 * 1000;

function complete_values(value) {
    if (value.length == 1)
        return '0' + value;
    return value;
}

function complete_increment(value) {
    var new_value = ''
    for(i = 0; i < 6 - value.length; i++) {
        new_value += '0';
    }

    return new_value + value;
}

function get_time(format) {
    var current_time = Date.now() % ms_in_day;
    var time_to_return = ''

    if (format == 'all_in_one') {
        time_to_return = (Math.trunc(current_time / (1000 * 60 * 60)) % 24).toString() + 'h ' +
            (Math.trunc(current_time / (1000 * 60)) % 60).toString() + 'm ' +
            (Math.trunc(current_time / 1000) % 60).toString() + 's ';
        var ms = current_time % 1000;
        if (ms < 10) {
            time_to_return += '00' + ms;
        } else if (ms < 100) {
            time_to_return += '0' + ms;
        } else {
            time_to_return += ms;
        }

        time_to_return += 'ms';
    }

    else if (format == 'all_no_labels') {
        var hours = complete_values((Math.trunc(current_time / (1000 * 60 * 60)) % 24).toString(16));
        var minutes = complete_values((Math.trunc(current_time / (1000 * 60)) % 60).toString(16));
        var seconds = complete_values((Math.trunc(current_time / 1000) % 60).toString(16));

        var ms = current_time % 1000;
        if (ms < 10) {
            time_to_return += '00' + ms;
        } else if (ms < 100) {
            time_to_return += '0' + ms;
        } else {
            time_to_return += ms;   
        }
        time_to_return = hours + minutes + seconds + parseInt(ms).toString(16);

    }

    else if (format == 'all_no_labels_rgb') {
        var hours = complete_values((Math.trunc(current_time / (1000 * 60 * 60)) % 24).toString());
        var minutes = complete_values((Math.trunc(current_time / (1000 * 60)) % 60).toString());
        var seconds = complete_values((Math.trunc(current_time / 1000) % 60).toString());

        var ms = current_time % 1000;
        if (ms < 10) {
            time_to_return += '00' + ms;
        } else if (ms < 100) {
            time_to_return += '0' + ms;
        } else {
            time_to_return += ms;
        }
        time_to_return = hours + minutes + seconds + parseInt(ms).toString();

    }

    else if (format == 'no_ms_no_label') {
        var hours = complete_values((Math.trunc(current_time / (1000 * 60 * 60)) % 24).toString(16));
        var minutes = complete_values((Math.trunc(current_time / (1000 * 60)) % 60).toString(16));
        var seconds = complete_values((Math.trunc(current_time / 1000) % 60).toString(16));

        time_to_return = hours + minutes + seconds; 
    }

    return time_to_return;
}

var increment_ms = 0;

var test = window.setInterval(function(){
    document.getElementById("all_in_one").innerHTML = get_time('all_in_one');
    document.getElementById("all_no_labels").innerHTML = get_time('all_no_labels');
    var rgb_colour = get_time('all_no_labels_rgb');
    document.getElementById("all_no_labels_rgb").innerHTML = rgb_colour;
    document.getElementById("all_no_labels_rgb").backgroundColor = rgb(rgb_colour);
    document.getElementById("no_ms_no_label").innerHTML = get_time('no_ms_no_label');
    document.getElementById("increment_ms").innerHTML = complete_increment(increment_ms.toString(16));

    increment_ms += 1;
    if (increment_ms > parseInt('0xFFFFFF'))
        increment_ms = 0;
},1)

