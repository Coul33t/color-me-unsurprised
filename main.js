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

        if (ms == 0) {
            time_to_return += '000';
        } else if (ms < 10) {
            time_to_return += '00' + ms;
        } else if (ms < 100) {
            time_to_return += '0' + ms;
        } else {
            time_to_return += ms;
        }
        time_to_return = hours + minutes + seconds + parseInt(ms).toString();

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

var test = window.setInterval(function(){
    document.getElementById("no_ms").innerHTML = get_time('no_ms');

    var val_to_change = Math.random() * 3;
    var more_or_less = (Math.random() * 2) - 1;

    if (more_or_less < 0)
        more_or_less = -1;
    else
        more_or_less = 1;
        
    if (val_to_change < 1) {
        r_random += more_or_less;
    } else if (val_to_change < 2) {
        g_random += more_or_less;
    } else {
        b_random += more_or_less;
    }

    var rgb_random = limit_rgb(r_random, g_random, b_random);

    document.getElementById("no_ms").style.background = 'rgb(' + rgb_random.join(',') + ')';

    var rgb_colour = get_time('all_no_labels_rgb');
    // TODO: here (complete milliseconds)
    document.getElementById("all_no_labels_rgb").innerHTML = rgb_colour;
    r = rgb_colour.substring(0, 3);
    g = rgb_colour.substring(3, 6);
    b = rgb_colour.substring(6, 9);
    var rgb_colour = limit_rgb(r, g, b);
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
}, 1)

