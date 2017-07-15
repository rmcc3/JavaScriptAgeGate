// Trying to avoid using jQuery, but feel free to change it to fit your needs.
// Supports IE8+

var _AccessAge = 18; // This should really be checked on the server too.
var _Month = null; // Selected month.
var _Day = null; // Selected day.
var _Year = null; // Selected year.

/**
 * Equivalent to jQuery's .ready() function.
 * @param fn
 */
function ready(fn) {
    if (document.readyState != 'loading'){
        fn();
    } else if (document.addEventListener) {
        document.addEventListener('DOMContentLoaded', fn);
    } else {
        document.attachEvent('onreadystatechange', function() {
            if (document.readyState != 'loading')
                fn();
        });
    }
}

// Called when the document is loaded.
ready(function() {
    var day = document.getElementById("gateDay");
    var month = document.getElementById("gateMonth");
    var year = document.getElementById("gateYear");

    var months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'];

    for (var i = 0; i < months.length; i++) {
        month.appendChild(
          new Option(months[i], (i+1).toString())
        );
    }

    for (var j = 1; j <= 31; j++) {
        day.appendChild(
            new Option(j, (j).toString())
        );
    }

    for (var k = 1910; k <= Number(new Date().getFullYear()); k++) {
        year.appendChild(
            new Option(k, (k).toString())
        );
    }
});

function updateGateMonth() {
    var e = document.getElementById("gateMonth");
    _Month = e.options[e.selectedIndex].value;

    // Test for complete age.
    doGateAgeCheck();
}

function updateGateDay() {
    var e = document.getElementById("gateDay");
    _Day = e.options[e.selectedIndex].value;

    // Test for complete age.
    doGateAgeCheck();
}

function updateGateYear() {
    var e = document.getElementById("gateYear");
    _Year = e.options[e.selectedIndex].value;

    // Test for complete age.
    doGateAgeCheck();
}

// Runs after a day, month, or year is selected.
function doGateAgeCheck() {
    if (_Month !== null && _Day !== null && _Year !== null) {
        var ageForm = document.getElementById('gateAgeForm');
        var noticeText = document.getElementById('noticeText');

        if (calculate_age(_Month, _Day, _Year) >= _AccessAge) {
            ageForm.style.display = 'none';
            noticeText.innerText = 'Hello, you are ' + calculate_age(_Month, _Day, _Year) + ' years old.';
        } else {
            ageForm.style.display = 'none';
            noticeText.innerText = 'Sorry, you must be ' + _AccessAge + ' years or older to enter.';
        }
    }
}

/**
 * @param birth_month
 * @param birth_day
 * @param birth_year
 * @return {number}
 */
function calculate_age(birth_month, birth_day, birth_year)
{
    var today_date = new Date();
    var today_year = today_date.getFullYear();
    var today_month = today_date.getMonth();
    var today_day = today_date.getDate();
    var age = today_year - birth_year;

    if ( today_month < (birth_month - 1))
    {
        age--;
    }
    if (((birth_month - 1) === today_month) && (today_day < birth_day))
    {
        age--;
    }
    return age;
}