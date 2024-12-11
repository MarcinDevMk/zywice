let calculationCount = 0; // Zmienna do liczenia obliczeń

document.getElementById("applicationForm").addEventListener("submit", function (e) {
    e.preventDefault();

    // Sprawdzanie, czy użytkownik nie przekroczył limitu obliczeń
    if (calculationCount >= 25) {
        alert("Osiągnięto maksymalną liczbę obliczeń.");
        document.getElementById("submitButton").disabled = true; // Blokowanie przycisku
        return;
    }

    const sleeveType = document.getElementById("sleeveType").value;
    const diameter = parseFloat(document.getElementById("diameter").value);
    const sleeveThickness = parseFloat(document.getElementById("sleeveThickness").value);
    const sleeveLength = parseFloat(document.getElementById("sleeveLength").value); // Długość rękawa
    const resinType = document.getElementById("resinType").value;
    const calculator = parseFloat(document.getElementById("calculator").value);
    const collectorDiameter = parseFloat(document.getElementById("collectorDiameter").value);

    if (!sleeveType || !diameter || !sleeveThickness || !sleeveLength || !resinType) {
        alert("Wypełnij wszystkie pola!");
        return;
    }

    let resinPerMeter;
    let totalResin;
    let resinRatioText = '';
    let additionalValue = 0;

    // Dodanie wartości żywicy na podstawie średnicy kolektora
    if (collectorDiameter) {
        switch (collectorDiameter) {
            case 150:
                additionalValue = 1.35;
                break;
            case 200:
                additionalValue = 1.69;
                break;
            case 300:
                additionalValue = 2.03;
                break;
            case 450:
                additionalValue = 2.365;
                break;
            case 500:
                additionalValue = 2.705;
                break;
            case 600:
                additionalValue = 3.04;
                break;
            case 700:
                additionalValue = 3.38;
                break;
            case 800:
                additionalValue = 4.06;
                break;
            default:
                additionalValue = 0;
                break;
        }
    }

    if (sleeveType === "2HomeLiner") {
        resinPerMeter = (((calculator * diameter * sleeveThickness * 3.14) / 1000) * 1.23) + additionalValue;
        totalResin = resinPerMeter * sleeveLength;
    } else {
        resinPerMeter = ((calculator * diameter * sleeveThickness * 3.14) / 1000) * 1.23;
        totalResin = resinPerMeter * sleeveLength;
    }

    // Obliczanie proporcji w zależności od rodzaju żywicy
    let ratioA, ratioB;
    if (resinType === "CS70") {
        ratioA = totalResin * 100 / (100 + 28);
        ratioB = totalResin * 28 / (100 + 28);
        resinRatioText = `Komponent A = ${ratioA.toFixed(2)} kg<br>Komponent B = ${ratioB.toFixed(2)} kg `;
    } else if (resinType === "CS400") {
        ratioA = totalResin * 100 / (100 + 33);
        ratioB = totalResin * 33 / (100 + 33);
        resinRatioText = `Komponent A = ${ratioA.toFixed(2)} kg<br>Komponent B = ${ratioB.toFixed(2)} kg `;
    }

    // Wyświetlanie wyników
    document.getElementById("resultSleeveType").innerText = `Rodzaj rękawa: ${sleeveType}`;
    document.getElementById("resultResinType").innerText = `Rodzaj żywicy: ${resinType}`;
    document.getElementById("resultPerMeter").innerText = `Żywica na metr: ${resinPerMeter.toFixed(2)} kg/m`;
    document.getElementById("resultTotal").innerText = `Całkowita ilość żywicy: ${totalResin.toFixed(2)} kg`;
    document.getElementById("resultSleeveLength").innerText = `Długość rękawa: ${sleeveLength.toFixed(2)} m`; // Długość rękawa
    document.getElementById("resultRatio").innerHTML = resinRatioText; // Używamy innerHTML, aby umożliwić wyświetlanie komponentów A i B jeden pod drugim

    document.getElementById("calculatorContainer").style.display = "none";
    document.getElementById("resultContainer").style.display = "block";

    // Zwiększanie licznika obliczeń po każdym obliczeniu
    calculationCount++;
});

// Obsługuje ukrywanie/wyświetlanie elementu collectorDiameterGroup w zależności od typu rękawa
document.getElementById("sleeveType").addEventListener("change", function () {
    const sleeveType = this.value;
    if (sleeveType === "2HomeLiner") {
        document.getElementById("collectorDiameterGroup").style.display = "block";
    } else {
        document.getElementById("collectorDiameterGroup").style.display = "none";
    }

    // Zmiana przelicznika na podstawie wyboru rękawa
    let newCalculatorValue = 0.7; // Domyślny przelicznik dla Insituform
    if (sleeveType === "ConsAir" || sleeveType === "2HomeLiner") {
        newCalculatorValue = 1.1; // Przelicznik dla ConsAir i 2HomeLiner
    }
    document.getElementById("calculator").value = newCalculatorValue;
});

// Obsługuje kliknięcie przycisku "Back" i powrót do formularza kalkulatora
document.getElementById("backButton").addEventListener("click", function () {
    document.getElementById("calculatorContainer").style.display = "block";
    document.getElementById("resultContainer").style.display = "none";
});
