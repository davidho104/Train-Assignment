window.firebase = function () {
    var config = {
        apiKey: "AIzaSyDzInA8yAQqOZKXG6hyLBxs1G7mwoBTgRQ",
        authDomain: "t-th-2018-b9e94.firebaseapp.com",
        databaseURL: "https://t-th-2018-b9e94.firebaseio.com",
        projectId: "t-th-2018-b9e94",
        storageBucket: "t-th-2018-b9e94.appspot.com",
        messagingSenderId: "442785351236"
    };
    firebase.initializeApp(config);
    return firebase;
}()
$(function () {
    let database = firebase.database();
    database.ref("schedArr").orderByChild("dateAdded")
    .on("child_added", function (snapshot) {
        let currentOutput = snapshot.val();
        let frequencyTime = currentOutput.frequency;
        let currentTime = moment();
        let firstTime = moment(currentOutput.first, "hh:mm").subtract(1, "years");
        let minutesDiff = moment().diff(moment(firstTime), "minutes");
        let remainder = minutesDiff % frequencyTime;
        let minutesAway = frequencyTime - remainder;
        let nextArrival = moment().add(minutesAway, "minutes", "hh:mm");

        var tableRow = $("<tr>");
        var currentName = $("<td>").text(currentOutput.name);
        var currentDestination = $("<td>").text(currentOutput.destination);
        var currentFrequency = $("<td>").text(currentOutput.frequency + "minutes");
        var currentFirstTime = $("<td>").text(moment(firstTime).format("hh:mm A"));
        var currentNextArrival = $("<td>").text(moment(nextArrival).format("hh:mm A"));
        var currentMinutesAway = $("<td>").text(minutesAway);
        tableRow.append(currentName).append(currentDestination).append(currentFrequency).append(currentFirstTime).append(currentNextArrival).append(currentMinutesAway);
        $("tbody").append(tableRow);
    })
    $("form").off("submit").on("submit", function (event) {
        event.preventDefault();
        let trainName = $("#trainName").val();
        let trainDestination = $("#trainDestination").val();
        let firstTrainTime = $("#firstTrainTime").val();
        let trainFrequency = $("#trainFrequency").val();

        $("#trainName").val("");
        $("#trainDestination").val("");
        $("#firstTrainTime").val("");
        $("#trainFrequency").val("");

        database.ref("schedArr").push({
            "name": trainName,
            "destination": trainDestination,
            "first": firstTrainTime,
            "frequency": trainFrequency
        });
    })

})