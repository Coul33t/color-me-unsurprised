// TODO: add one more random timezone each time

const ms_in_day = 86400 * 1000;

function complete_values(value) {
    if (value.length == 1)
        return '0' + value;
    return value;
}

function complete_milliseconds(value) {
    if (value.length == 1)
        return '00' + value;
    else if (value.length == 2)
        return '0' + value;
    return value
}

function complete_increment(value) {
    var new_value = '';

    for(i = 0; i < 6 - value.length; i++) {
        new_value += '0';
    }

    return new_value + value;
}

function get_time(format) {
    var d = new Date();
    var current_time = d.getTime() % ms_in_day;
    var time_to_return = '';

    if (format == 'all_in_one') {
        time_to_return = d.getHours() + 'h ' +
                         d.getMinutes() + 'm ' +
                         d.getSeconds() + 's ';

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

    else if (format == 'no_ms') {
        time_to_return = d.getHours() + 'h ' +
                         d.getMinutes() + 'm ' +
                         d.getSeconds() + 's ';

    }

    else if (format == 'all_no_labels') {
        var hours = complete_values(d.getHours());
        var minutes = complete_values(d.getMinutes());
        var seconds = complete_values(d.getSeconds());

        var ms = d.getMilliseconds();
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
        var hours = complete_values(d.getHours().toString());
        var minutes = complete_values(d.getMinutes().toString());
        var seconds = complete_values(d.getSeconds().toString());

        var ms = d.getMilliseconds().toString();

        if (ms.length == 1) {
            ms = '00' + ms;
        } else if (ms.length == 2) {
            ms = '0' + ms;
        } else {
            ms = ms;
        }

        time_to_return = hours + minutes + seconds + ms;

    }

    else if (format == 'no_ms_no_label') {
        var hours = complete_values(d.getHours().toString());
        var minutes = complete_values(d.getMinutes().toString());
        var seconds = complete_values(d.getSeconds().toString());

        time_to_return = hours + minutes + seconds;
    }

    return time_to_return;
}

function limit_rgb(r, g, b) {
    if (r > 255)
        r = 255;
    else if (r < 0)
        r = 0;

    if (g > 255)
        g = 255;
    else if (g < 0)
        g = 0;

    if (b > 255)
        b = 255;
    else if (b < 0)
        b = 0;

    return [r, g, b];
}

var increment_ms = 0;

var r_random = Math.floor((Math.random() * 256))
var g_random = Math.floor((Math.random() * 256))
var b_random = Math.floor((Math.random() * 256))

var cycle_count = 0
var cycle_limit = 500
var desired_variation = 50

var val_to_change = Math.random() * 3;
var more_or_less = (Math.random() * 2) - 1;

document.getElementById("yours").getElementsByClassName('global_name')[0].innerHTML = "Take your time";
var test = window.setInterval(function(){

    document.getElementById("no_ms").getElementsByClassName('number')[0].innerHTML = get_time('no_ms');

    // TODO: change 3 colours at the same time, with various + or -
    if (cycle_count > cycle_limit) {

        cycle_count = 0;
        val_to_change = Math.random() * 3;
        more_or_less = (Math.random() * 2) - 1;

        if (more_or_less < 0)
            more_or_less = -desired_variation / cycle_limit;
        else
            more_or_less = desired_variation / cycle_limit;

        // Not going out of range (and thus not changing the colours for a cycle)
        if (((val_to_change == 0) && (more_or_less == -1) && (r_random < 0))  ||
            ((val_to_change == 0) && (more_or_less == 1) && (r_random > 255)) ||
            ((val_to_change == 1) && (more_or_less == -1) && (g_random < 0))  ||
            ((val_to_change == 1) && (more_or_less == 1) && (g_random > 255)) ||
            ((val_to_change == 2) && (more_or_less == -1) && (b_random < 0))  ||
            ((val_to_change == 2) && (more_or_less == 1) && (b_random > 255)))
            more_or_less = -more_or_less;
    }

    if (val_to_change < 1) {
        r_random += more_or_less;
        if (r_random < 0)
            r_random = 0;
        if (r_random > 255)
            r_random = 255;
    } else if (val_to_change < 2) {
        g_random += more_or_less;
        if (g_random < 0)
            g_random = 0;
        if (g_random > 255)
            g_random = 255;
    } else {
        b_random += more_or_less;
        if (b_random < 0)
            b_random = 0;
        if (b_random > 255)
            b_random = 255;
    }


    var rgb_random = limit_rgb(r_random, g_random, b_random);

    document.getElementById("no_ms").style.background = 'rgb(' + rgb_random.join(',') + ')';

    var rgb_colour = get_time('all_no_labels_rgb');
    document.getElementById("all_no_labels_rgb").getElementsByClassName('number')[0].innerHTML = rgb_colour;

    r = rgb_colour.substring(0, 3);
    g = rgb_colour.substring(3, 6);
    b = rgb_colour.substring(6, 9);
    // rescaled such as the range goes from 0 -> 999 to 0 -> 255 (so that the colour doesn't "saturate" too fast)
    rescaled_b = b * (255 / 999);
    var rgb_colour = limit_rgb(r, g, rescaled_b);
    document.getElementById("all_no_labels_rgb").style.background = 'rgb(' + rgb_colour.join(',') + ')';

    var hexa_colour = get_time('no_ms_no_label');
    document.getElementById("no_ms_no_label").innerHTML = hexa_colour;
    r = parseInt(hexa_colour.substring(0, 2), 16);
    g = parseInt(hexa_colour.substring(2, 4), 16);
    b = parseInt(hexa_colour.substring(4, 6), 16);

    var hexa_colour = limit_rgb(r, g, b);
    document.getElementById("no_ms_no_label").style.background = 'rgb(' + hexa_colour.join(',') + ')';

    var hexa_increment = complete_increment(increment_ms.toString(16));
    document.getElementById("increment_ms").innerHTML = hexa_increment;
    r = parseInt(hexa_increment.substring(0, 2), 16);
    g = parseInt(hexa_increment.substring(2, 4), 16);
    b = parseInt(hexa_increment.substring(4, 6), 16);
    var hexa_increment = limit_rgb(r, g, b);
    document.getElementById("increment_ms").style.background = 'rgb(' + hexa_increment.join(',') + ')';

    increment_ms += 1;
    if (increment_ms > parseInt('0xFFFFFF'))
        increment_ms = 0;

    cycle_count += 1;
}, 1)

