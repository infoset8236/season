function applySeason() {
    const month = new Date().getMonth() + 1;
    const season = month <= 2 || month === 12 ? 'winter'
        : month <= 5 ? 'spring'
            : month <= 8 ? 'summer'
                : 'autumn';
    document.querySelector('.container').className = 'container ' + season;
}

function updateDateTime() {
    const now = new Date();
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    const day = days[now.getDay()];
    $('.currentDate').contents().first().replaceWith(`${y}.${m}.${d}(${day})`);

    const h = now.getHours();
    const min = String(now.getMinutes()).padStart(2, '0');
    const ampm = h < 12 ? '오전' : '오후';
    const h12 = String(h % 12 || 12).padStart(2, '0');
    $('.currentTime').text(`${ampm} ${h12}:${min}`);
}

function scheduleMidnight(fn) {
    const next = new Date();
    next.setHours(24, 0, 0, 0);
    setTimeout(() => { fn(); setInterval(fn, 86400000); }, next - new Date());
}

$(function() {
    $('#header').load('/resources/common/includes/header.html', function() {
        updateDateTime();
        setInterval(updateDateTime, 60000);
    });

    $.ajax({
        url: 'https://api.openweathermap.org/data/2.5/forecast',
        data: { q: 'Daegu', appid: '3bcf7eca7fc5d5df252135e43043a0a7', units: 'metric' },
        dataType: 'json',
        success: function({ list }) {
            $('img.weather')
                .attr('src', '/resources/common/img/' + list[0].weather[0].icon + '.png')
                .css('visibility', 'visible');
        }
    });

    applySeason();
    scheduleMidnight(applySeason);
});