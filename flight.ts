let passengers = document.querySelectorAll('ul.passengers-list>li') as NodeListOf<HTMLElement>;
let passengerWithBiggestId: HTMLElement | undefined;

for (const passenger of passengers) {
  const biggestId = passengerWithBiggestId?.dataset.passengerId ?? "";

  if (passenger.dataset.passengerId ?? "" > biggestId) {
    passengerWithBiggestId = passenger;
  }
}

if (passengerWithBiggestId !== undefined) {
  console.log(`Passenger with biggsest id: ${passengerWithBiggestId.innerText}.`);
} else {
    console.log('There is no passenger on list.');
}
