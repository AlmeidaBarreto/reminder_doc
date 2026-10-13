/* =========================================================
   DOCUMENT REGISTER PAGE
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        console.log(
            "Document register page loaded"
        );


        /*
         * Get form
         */

        const form =
            document.getElementById(
                "documentForm"
            );


        /*
         * Get save button
         */

        const saveButton =
            document.getElementById(
                "saveButton"
            );



        /*
         * Find date fields
         */

        const dateInputs =
            document.querySelectorAll(
                'input[type="date"]'
            );



        /*
         * If there are date fields,
         * configure them
         */

        if (dateInputs.length >= 1) {

            const expirationInput =
                dateInputs[0];


            /*
             * Prevent selecting a date
             * in the past for expiration
             */

            const today =
                new Date()
                    .toISOString()
                    .split("T")[0];


            expirationInput.min = today;


            /*
             * If a second date field exists,
             * it is probably reminder date
             */

            if (dateInputs.length >= 2) {

                const reminderInput =
                    dateInputs[1];


                /*
                 * Reminder cannot be
                 * before today
                 */

                reminderInput.min = today;



                /*
                 * Check reminder date
                 */

                expirationInput.addEventListener(
                    "change",
                    function () {

                        if (
                            !expirationInput.value
                        ) {
                            return;
                        }


                        reminderInput.max =
                            expirationInput.value;

                    }
                );

            }

        }



        /*
         * Form submit
         */

        if (form) {

            form.addEventListener(
                "submit",
                function (event) {


                    /*
                     * Find required fields
                     */

                    const requiredFields =
                        form.querySelectorAll(
                            "[required]"
                        );


                    let valid = true;



                    /*
                     * Validate required fields
                     */

                    requiredFields.forEach(
                        function (field) {

                            field.classList.remove(
                                "input-error"
                            );


                            if (
                                !field.value.trim()
                            ) {

                                valid = false;

                                field.classList.add(
                                    "input-error"
                                );

                            }

                        }
                    );



                    /*
                     * Stop submit if invalid
                     */

                    if (!valid) {

                        event.preventDefault();


                        alert(
                            "Please complete all required fields."
                        );


                        return;

                    }



                    /*
                     * Check date relationship
                     */

                    if (
                        dateInputs.length >= 2
                    ) {

                        const expirationDate =
                            new Date(
                                dateInputs[0].value
                            );


                        const reminderDate =
                            new Date(
                                dateInputs[1].value
                            );


                        if (
                            reminderDate >
                            expirationDate
                        ) {

                            event.preventDefault();


                            alert(
                                "Reminder date cannot be later than the expiration date."
                            );


                            dateInputs[1].focus();


                            return;

                        }

                    }



                    /*
                     * Prevent double submission
                     */

                    if (saveButton) {

                        saveButton.disabled =
                            true;


                        saveButton.innerHTML =
                            "⏳ Saving...";

                    }

                }
            );

        }



        /*
         * Remove error style
         * when user starts typing
         */

        const fields =
            document.querySelectorAll(
                "input, select, textarea"
            );


        fields.forEach(
            function (field) {

                field.addEventListener(
                    "input",
                    function () {

                        field.classList.remove(
                            "input-error"
                        );

                    }
                );


                field.addEventListener(
                    "change",
                    function () {

                        field.classList.remove(
                            "input-error"
                        );

                    }
                );

            }
        );

    }
);



/* =========================================================
   MOBILE SIDEBAR
========================================================= */

function toggleSidebar() {

    const sidebar =
        document.getElementById(
            "sidebar"
        );


    if (sidebar) {

        sidebar.classList.toggle(
            "show"
        );

    }

}