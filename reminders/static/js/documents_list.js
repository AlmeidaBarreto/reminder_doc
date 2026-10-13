/* =========================================================
   CALCULATE DOCUMENT EXPIRATION STATUS
========================================================= */

function calculateDocumentStatus() {

    const rows =
        document.querySelectorAll(".document-row");


    let validCount = 0;

    let warningCount = 0;

    let expiredCount = 0;


    /*
     * Get today's date
     */

    const today = new Date();

    today.setHours(0, 0, 0, 0);



    /*
     * Loop through documents
     */

    rows.forEach(function(row) {


        /*
         * Get expiration date
         */

        const expirationDateString =
            row.getAttribute("data-expiration");


        if (!expirationDateString) {
            return;
        }


        /*
         * Convert expiration date
         */

        const expirationDate =
            new Date(expirationDateString);


        expirationDate.setHours(0, 0, 0, 0);



        /*
         * Calculate difference
         */

        const difference =
            expirationDate - today;


        const daysRemaining =
            Math.ceil(
                difference /
                (1000 * 60 * 60 * 24)
            );



        /*
         * Display days remaining
         */

        const daysElement =
            row.querySelector(".days-remaining");


        if (daysRemaining < 0) {

            daysElement.textContent =
                Math.abs(daysRemaining) +
                " days ago";

        }

        else if (daysRemaining === 0) {

            daysElement.textContent =
                "Today";

        }

        else {

            daysElement.textContent =
                daysRemaining +
                " days";

        }



        /*
         * Get status element
         */

        const statusElement =
            row.querySelector(
                ".document-status span"
            );



        /*
         * EXPIRED
         */

        if (daysRemaining < 0) {

            statusElement.textContent =
                "Expired";


            statusElement.className =
                "status status-expired";


            row.dataset.status =
                "expired";


            expiredCount++;

        }



        /*
         * EXPIRING SOON
         */

        else if (daysRemaining <= 30) {

            statusElement.textContent =
                "Expiring Soon";


            statusElement.className =
                "status status-warning";


            row.dataset.status =
                "warning";


            warningCount++;

        }



        /*
         * VALID
         */

        else {

            statusElement.textContent =
                "Valid";


            statusElement.className =
                "status status-valid";


            row.dataset.status =
                "valid";


            validCount++;

        }

    });



    /*
     * Update dashboard counters
     */

    document.getElementById(
        "validDocuments"
    ).textContent = validCount;


    document.getElementById(
        "expiringDocuments"
    ).textContent = warningCount;


    document.getElementById(
        "expiredDocuments"
    ).textContent = expiredCount;

}



/* =========================================================
   SEARCH DOCUMENTS
========================================================= */

function filterDocuments() {


    /*
     * Get search value
     */

    const searchValue =
        document
            .getElementById("searchInput")
            .value
            .toLowerCase();



    /*
     * Get selected status
     */

    const statusValue =
        document
            .getElementById("statusFilter")
            .value;



    /*
     * Get all document rows
     */

    const rows =
        document.querySelectorAll(
            ".document-row"
        );



    /*
     * Check every row
     */

    rows.forEach(function(row) {


        const title =
            row.dataset.title || "";


        const email =
            row.dataset.email || "";


        const status =
            row.dataset.status || "";



        /*
         * Search condition
         */

        const matchesSearch =
            title.includes(searchValue) ||
            email.includes(searchValue);



        /*
         * Status condition
         */

        const matchesStatus =
            statusValue === "all" ||
            status === statusValue;



        /*
         * Show or hide row
         */

        if (
            matchesSearch &&
            matchesStatus
        ) {

            row.style.display = "";

        }

        else {

            row.style.display = "none";

        }

    });

}



/* =========================================================
   SEARCH EVENT
========================================================= */

document
    .getElementById("searchInput")
    .addEventListener(
        "input",
        filterDocuments
    );



/* =========================================================
   STATUS FILTER EVENT
========================================================= */

document
    .getElementById("statusFilter")
    .addEventListener(
        "change",
        filterDocuments
    );



/* =========================================================
   MOBILE SIDEBAR
========================================================= */

function toggleSidebar() {

    document
        .getElementById("sidebar")
        .classList.toggle("show");

}



/* =========================================================
   PAGE LOAD
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        calculateDocumentStatus();

    }
);