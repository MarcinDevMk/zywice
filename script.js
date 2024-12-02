document.getElementById("applicationForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const sleeveType = document.getElementById("sleeveType").value;
    const diameter = parseFloat(document.getElementById("diameter").value);
    const sleeveThickness = parseFloat(document.getElementById("sleeveThickness").value);
    const sleeveLength = parseFloat(document.getElementById("sleeveLength").value);
    const resinType = document.getElementById("resinType").value;
    const calculator = parseFloat(document.getElementById("calculator").value);
    const collectorDiameter = document.getElementById("collectorDiameter").value;

    if (!sleeveType || !diameter || !sleeveThickness || !sleeveLength || !resinType) {
        alert("Wypełnij wszystkie pola!");
        return;
    }

    let resinPerMeter;
    let totalResin;
    let resinRatioText = '';

    if (sleeveType === "2HomeLiner") {
        let additionalValue = 0;

        switch (diameter) {
            case 200:
                additionalValue = 1.35;
                break;
            case 250:
                additionalValue = 1.69;
                break;
            case 300:
                additionalValue = 2.03;
                break;
            case 350:
                additionalValue = 2.365;
                break;
            case 400:
                additionalValue = 2.705;
                break;
            case 450:
                additionalValue = 3.04;
                break;
            case 500:
                additionalValue = 3.38;
                break;
            case 600:
                additionalValue = 4.06;
                break;
            case 700:
                additionalValue = 4.73;
                break;
            case 800:
                additionalValue = 5.41;
                break;
            default:
                additionalValue = 0;
                break;
        }

        resinPerMeter = ((calculator * diameter * sleeveThickness * 3.14) / 1000) + additionalValue;
        totalResin = resinPerMeter * sleeveLength;

    } else {
        resinPerMeter = ((calculator * diameter * sleeveThickness * 3.14) / 1000) * 1.28;
        totalResin = resinPerMeter * sleeveLength;
    }

    // Obliczanie proporcji w zależności od rodzaju żywicy
    if (resinType === "CS70") {
        const ratioA = totalResin * 100 / (100 + 28);
        const ratioB = totalResin * 28 / (100 + 28);
        resinRatioText = `Komponent A = ${ratioA.toFixed(2)} kg, Komponent B = ${ratioB.toFixed(2)} kg (proporcja 100:28)`;
    } else if (resinType === "CS400") {
        const ratioA = totalResin * 100 / (100 + 33);
        const ratioB = totalResin * 33 / (100 + 33);
        resinRatioText = `Komponent A = ${ratioA.toFixed(2)} kg, Komponent B = ${ratioB.toFixed(2)} kg (proporcja 100:33)`;
    }

    // Wyświetlanie wyników
    document.getElementById("resultSleeveType").innerText = `Rodzaj rękawa: ${sleeveType}`;
    document.getElementById("resultResinType").innerText = `Rodzaj żywicy: ${resinType}`;
    document.getElementById("resultPerMeter").innerText = `Żywica na metr: ${resinPerMeter.toFixed(2)} kg/m`;
    document.getElementById("resultTotal").innerText = `Całkowita ilość żywicy: ${totalResin.toFixed(2)} kg`;
    document.getElementById("resultRatio").innerText = resinRatioText;

    document.getElementById("calculatorContainer").style.display = "none";
    document.getElementById("resultContainer").style.display = "block";
});

document.getElementById("sleeveType").addEventListener("change", function () {
    const sleeveType = this.value;
    if (sleeveType === "2HomeLiner") {
        document.getElementById("collectorDiameterGroup").style.display = "block";
    } else {
        document.getElementById("collectorDiameterGroup").style.display = "none";
    }
});

document.getElementById("backButton").addEventListener("click", function () {
    document.getElementById("calculatorContainer").style.display = "block";
    document.getElementById("resultContainer").style.display = "none";
});
