window.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll(".btn-handle").forEach((element,index)=>{
        element.addEventListener("click", function() {
            TogglePopup(this.getAttribute("data-action"));
            console.log("a")
        });
    })
});

function TogglePopup(action) {
    console.log("a")
    const popupContent = document.querySelector(".popup-content");
    
    if (!popupContent) {
        console.error("Popup content element not found.");
        return;
    }

    if (action === "o-pop") {
        popupContent.classList.add("active");
    } else if (action === "c-pop") {
        popupContent.classList.remove("active");
    } else {
        console.error("Invalid action:", action);
    }
}
