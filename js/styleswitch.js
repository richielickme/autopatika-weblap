document.addEventListener('DOMContentLoaded', function () {
    var gomb = document.getElementById('styleDropdownBtn');
    var opciok = document.querySelectorAll('.style-option');

    if (!gomb || opciok.length === 0) return;

    var mentett = localStorage.getItem('autopatika-stilus') || 'normal';
    stilusAlkalmaz(mentett);
    gombSzovegFrissites(mentett);

    opciok.forEach(function(opcio) {
        opcio.addEventListener('click', function(e) {
            e.preventDefault();

            var kivalasztottErtek = this.getAttribute('data-value');

            stilusAlkalmaz(kivalasztottErtek);
            gombSzovegFrissites(kivalasztottErtek);
            localStorage.setItem('autopatika-stilus', kivalasztottErtek);

            var dropdownInstance = bootstrap.Dropdown.getOrCreateInstance(gomb);
            dropdownInstance.hide();
        });
    });

    function gombSzovegFrissites(ertek) {
        if (ertek === 'nagy') {
            gomb.textContent = 'Nagy kontrasztú / nagy betűs';
            gomb.className = 'btn btn-dark dropdown-toggle border-warning text-warning';
        } else {
            gomb.textContent = 'Normál';
            gomb.className = 'btn btn-outline-light dropdown-toggle';
        }
    }

    function stilusAlkalmaz(ertek) {
        var meglevo = document.getElementById('extra-stilus');
        if (ertek === 'nagy') {
            if (!meglevo) {
                var link = document.createElement('link');
                link.id = 'extra-stilus';
                link.rel = 'stylesheet';
                link.href = 'css/nagy.css';
                document.head.appendChild(link);
            }
        } else {
            if (meglevo) {
                meglevo.parentNode.removeChild(meglevo);
            }
        }
    }

    window.addEventListener('beforeprint', function () {
        var extraStilus = document.getElementById('extra-stilus');
        if (extraStilus) {
            extraStilus.setAttribute('media', 'none');
        }
    });

    window.addEventListener('afterprint', function () {
        var extraStilus = document.getElementById('extra-stilus');
        if (extraStilus) {
            extraStilus.setAttribute('media', 'all');
        }
    });
});