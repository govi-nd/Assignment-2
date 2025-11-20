
const packages = [
    { id: 1, destination: "Goa", durationDays: 4, basePrice: 12000, season: "winter" },
    { id: 2, destination: "Manali", durationDays: 5, basePrice: 15000, season: "summer" },
    { id: 3, destination: "Dubai", durationDays: 6, basePrice: 55000, season: "peak" }
];


function loadPackages() {
    const table = document.getElementById("packageTable");

    packages.forEach(pkg => {
        let multiplier = pkg.season === "peak" ? 1.3 :
                         pkg.season === "winter" ? 1.1 :
                         1.0;

        const finalPrice = pkg.basePrice * multiplier;

        table.innerHTML += `
            <tr>
                <td>${pkg.destination}</td>
                <td>${pkg.durationDays} Days</td>
                <td>₹${pkg.basePrice}</td>
                <td>₹${finalPrice.toFixed(0)}</td>
            </tr>
        `;
    });
}


function calculatePrice() {
    let pkg = document.getElementById("package").value;
    let guests = Number(document.getElementById("guests").value);
    let checkIn = new Date(document.getElementById("checkIn").value);
    let checkOut = new Date(document.getElementById("checkOut").value);

    if (!checkIn || !checkOut || guests < 1) return;

    let nights = (checkOut - checkIn) / (1000 * 60 * 60 * 24);

    let selected = packages.find(p => p.destination === pkg);

    let base = selected.basePrice;

    if (guests > 2)
        base *= 1.2;   

    let total = base + (nights * 500); 

    document.getElementById("total").innerText = "₹" + total.toFixed(0);
}

function openModal(img) {
    const large = img.getAttribute("data-large");
    const modal = document.getElementById("modal");
    document.getElementById("modalImg").src = large;
    modal.style.display = "block";
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}

window.onload = function () {
    const links = document.querySelectorAll("nav a");
    links.forEach(a => {
        if (a.href.includes(location.pathname))
            a.classList.add("active");
    });
};
