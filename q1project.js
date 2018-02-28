//for converter.html
function weightConverter(valNum) {
  document.getElementById("outputKilograms").innerHTML = convert.lbToKg(valNum);
}

function distanceConverter(valNum) {
  document.getElementById("outputKilometres").innerHTML = convert.miToKm(valNum); 
}

function volumeConverter(valNum) {
  document.getElementById("outputLitres").innerHTML = convert.galToL(valNum);
}

function smallweightConverter(valNum) {
  document.getElementById("outputGrams").innerHTML = valNum / 0.03527399;
}

function tempConverter(valNum) {
  document.getElementById("outputC").innerHTML = (valNum - 32) / (9/5);
}

function lengthConverter() {
  var feet = parseFloat(document.getElementById('inputFeet').value || "0");
  var inches = parseFloat(document.getElementById('inputInches').value || "0");
  document.getElementById("outputMetres").innerHTML = (feet + (inches/12.0)) / 3.28084;
}

//for forex.html
var forexData;
if (typeof $ !== 'undefined') {
  $.get("https://api.fixer.io/latest", function(data) {
    forexData = data;
    console.log(forexData);
  });
}

function AUDConverter(valNum) {
  var conversionFactor = forexData.rates.AUD / forexData.rates.USD;
  document.getElementById("outputUSD").innerHTML = valNum / conversionFactor;
}

function USDConverter(valNum) {
  var conversionFactor = forexData.rates.USD / forexData.rates.AUD;
  document.getElementById("outputAUD").innerHTML = valNum / conversionFactor;
}

// for slang.html
if (typeof $ !== 'undefined') {
  $(document).ready(function() {
    let favorites = JSON.parse(localStorage.getItem("favorites"));
    if (!favorites) {
      favorites = {};
    }

    const renderTable = function(slang) {
      const $rootDiv = $('#translations-table');

      $rootDiv.html('');

      for (const entry of slang) {
        const $divAustralian = $('<div class="col-4">').text(entry.australian);
        const $divAmerican = $('<div class="col-6">').text(entry.american);

        const $divFav = $('<div class="col-2">').css('cursor', 'ew-resize');

        if (favorites[entry.id]) {
          $divFav.text('❤️');
        }
        else {
          $divFav.text('💔');
        }

        $divFav.on('click', () => {
          favorites[entry.id] = !favorites[entry.id];
          localStorage.setItem("favorites", JSON.stringify(favorites));
          renderTable(slang);
        });

        const $divRow = $('<div class="row">');

        $divRow.append($divAustralian);
        $divRow.append($divAmerican);
        $divRow.append($divFav);

        $rootDiv.append($divRow);
      }
    };

    var slang = [
      {
        id: 0,
        australian: 'Car Park',
        american: 'Parking Lot'
      },
      {
        id: 1,
        australian: 'Heaps',
        american: 'A Lot'
      },
      {
        id: 2,
        australian: 'Mates',
        american: 'Friends'
      },
      {
        id: 3,
        australian: 'Bogans',
        american: 'Rednecks'
      },
      {
        id: 4,
        australian: 'Mozzies',
        american: 'Mosquitoes'
      },
      {
        id: 5,
        australian: 'Petro',
        american: 'Gas'
      },
      {
        id: 6,
        australian: 'No Drama',
        american: 'No Problem'
      },
      {
        id: 7,
        australian: 'Thong',
        american: 'Flip-flops'
      },
      {
        id: 8,
        australian: 'Wanker',
        american: 'Annoying Individual'
      },
      {
        id: 9,
        australian: 'Feral',
        american: 'Messy/Untamed'
      },
      {
        id: 10,
        australian: 'Keen',
        american: 'Want to do something'
      },
      {
        id: 11,
        australian: 'Reckon',
        american: 'Recommend/Consider'
      },
      {
        id: 12,
        australian: 'Footy',
        american: 'Australian Football League'
      },
      {
        id: 13,
        australian: "Can't be arsed",
        american: "Can't be bothered to do something"
      },
      {
        id: 14,
        australian: 'Knackered',
        american: 'Exhausted'
      },
      {
        id: 15,
        australian: 'Devvo',
        american: 'Devastated'
      },
      {
        id: 16,
        australian: 'Barbie',
        american: 'Barbecue'
      },
      {
        id: 17,
        australian: 'Cradle Snatcher',
        american: 'Cougar'
      }
    ];

    renderTable(slang);
  });
}
