window.addEventListener('offline',()=>{
	alert('Connection lost!  Some resources will not load.');
})
window.addEventListener("load", ()=>{
	
	/*Getting Tbody*/
	const table = document.querySelector('#days');
	
	const monthArray = ["January", "February", "March", "April", "May", "June",
	"July", "August", "September", "October", "November", "December"];
	
	function getDaysCalendar(year,month){
	
	const monthYear = document.querySelector('#monthYear');
	monthYear.innerText = `${monthArray[month]} ${year}`;
	
	let firstDayMonth = new Date(year, month, 1).getDate() - 1;
	let lastDayMonth = new Date(year, month + 1, 0).getDate();
	
	for(let i = -firstDayMonth, index = 0;i<(42-firstDayMonth);i++, index++){
		let dateNow = new Date();
		let dt = new Date(year, month, i);
		let dayTable = table.getElementsByTagName('td')[index];
		dayTable.classList.remove("lastMonth");
		dayTable.classList.remove("nextMonth");
		dayTable.classList.remove("today");
		dayTable.innerHTML = dt.getDate();
		
		if(dt.getFullYear() === dateNow.getFullYear() && dt.getMonth() === dateNow.getMonth() && dt.getDate() === dateNow.getDate()){
			dayTable.classList.add('today');
		}
		if(i < 1){
			dayTable.classList.add('lastMonth');
		}
		if(i > lastDayMonth){
			dayTable.classList.add('nextMonth');
		}
	}//for
	
	}
	
	let now = new Date();
	let year = now.getFullYear();
	let month = now.getMonth();
	
	getDaysCalendar(year, month);
	const todayBttn = document.querySelector('#todayBttn');
	const prevBttn = document.getElementById('previousBttn');
	const nextBttn = document.getElementById('nextBttn');
	
	todayBttn.addEventListener('click', ()=>{
		month = now.getMonth();
		year = now.getFullYear();
		
		getDaysCalendar(year, month);
	})
	
	prevBttn.addEventListener('click', ()=>{
		month--;
		if(month < 0){
			month = 11;
			year--;
		}
		getDaysCalendar(year, month);
	})
	
	nextBttn.addEventListener('click', ()=>{
		month++;
		if(month > 11){
			month = 0;
			year++;
		}
		getDaysCalendar(year, month);
	})
	let arrayEvents = [];
	let eventsHTML = [];
	let countEventsInDay;
	let dayClick;
	/*Inputs Create Event*/
	const nameEventInput = document.querySelector('#nameEvent');
	const allDayInput = document.querySelector('#allDay');
	const startTimeInput = document.querySelector('#startTime');
	const endTimeInput = document.querySelector('#endTime');
	const localEventInput = document.querySelector('#local');
	const eventDescriptionInput = document.querySelector('#description');
	/*Inputs Create Event*/
	
	const dayEventsButtons = document.querySelector('.dayEventsButtons');
	const dayEventsList = document.querySelector('.dayEventList');
	const viewEvents = document.querySelector('#viewEvents');
	const doneBttn = document.querySelector('#doneBttn');
	const createEventForm = document.querySelector('.createEventForm');
	const addReminder = document.querySelector('#addReminder');
	const closeCreateEvent = document.querySelector('.closeCreateEvent');
	const closeEventList = document.querySelector('#closeEventList');
	
	table.addEventListener('click', (e)=>{
		dayEventsButtons.style.display = 'flex';
		
		if(createEventForm.classList == 'createEventForm' && dayEventsList.classList == 'dayEventList'){
			dayClick = e.target.innerText;
			if(month == 0 && e.target.classList == 'lastMonth'){
				addReminder.innerText = `+ Add Reminder on ${dayClick}/12/${year-1}`;
			}else if(e.target.classList == 'lastMonth'){
				addReminder.innerText = `+ Add Reminder on ${dayClick}/${month}/${year}`;
			}else if(e.target.classList == 'nextMonth'){
				addReminder.innerText = `+ Add Reminder on ${dayClick}/${month+2}/${year}`;
			}else{
				addReminder.innerText = `+ Add Reminder on ${dayClick}/${month+1}/${year}`;
			}
		}
		countEventsInDay = 0;
		
		if(arrayEvents.length > 0){
			let cont = 0;
			for(let pos in arrayEvents){
				if(arrayEvents[pos].dayEvent == dayClick && arrayEvents[pos].monthEvent == month && arrayEvents[pos].yearEvent == year){
					dayEventsList.appendChild(eventsHTML[cont]);
					eventsHTML[cont].style.display = "flex";
					countEventsInDay++;
					cont++;
				}
				if(arrayEvents[pos].dayEvent != dayClick || arrayEvents[pos].monthEvent != month || arrayEvents[pos].yearEvent != year){
					dayEventsList.appendChild(eventsHTML[cont]);
					eventsHTML[cont].style.display = "none";
					cont++;
				}
			}//for
		}//if
		
		countEvents.innerText = `You have ${countEventsInDay} reminders that day.`;
	});
	
	doneBttn.addEventListener('click', (e)=>{
		dayEventsButtons.style.display = 'none';
	})
	/*Open Create Event*/
	addReminder.addEventListener('click', ()=>{
		createEventForm.classList.remove('createEventForm');
		createEventForm.classList.add('createEventFormOpen');
		
		allDay.addEventListener('click', ()=>{
			if(allDay.checked == true){
				startTimeInput.removeAttribute("required");
				endTimeInput.removeAttribute("required");
				startTimeInput.setAttribute("readonly", "readonly");
				endTimeInput.setAttribute("readonly", "readonly");
			}else{
				startTimeInput.setAttribute("required", "required");
				endTimeInput.setAttribute("required", "required");
				startTimeInput.removeAttribute("readonly");
				endTimeInput.removeAttribute("readonly");
			};
		});
	});
	/*Close Create Event*/
	closeCreateEvent.addEventListener('click', ()=>{
		createEventForm.classList.remove('createEventFormOpen');
		createEventForm.classList.add('createEventForm');
		
		nameEventInput.value = "";
		allDayInput.checked = false;
		startTimeInput.value = "";
		endTimeInput.value = "";
		localEventInput.value = "";
		eventDescriptionInput.value = "";
	});
	
	viewEvents.addEventListener('click', ()=>{
		dayEventsList.classList.remove('dayEventList');
		dayEventsList.classList.add('dayEventListOpen');
	});
	closeEventList.addEventListener('click', ()=>{
		dayEventsList.classList.remove('dayEventListOpen');
		dayEventsList.classList.add('dayEventList');
	});
	
	createEventForm.addEventListener('submit', (e)=>{
		e.preventDefault();
		
		let nameEvent = nameEventInput.value;
		let allDay = allDayInput.checked;
		let startTime = startTimeInput.value;
		let endTime = endTimeInput.value;
		let localEvent = localEventInput.value;
		let eventDescription = eventDescriptionInput.value;
		
		nameEventInput.value = "";
		allDayInput.checked = false;
		startTimeInput.value = "";
		endTimeInput.value = "";
		localEventInput.value = "";
		eventDescriptionInput.value = "";
		
		createEventForm.classList.remove('createEventFormOpen');
		createEventForm.classList.add('createEventForm');
		
		let objEvent = new EventObject(nameEvent, allDay, startTime,
		endTime, localEvent, eventDescription);
		
		/*Constructor Function*/
		function EventObject(nameEvent, allDay, startTime,
		endTime, localEvent, eventDescription){
			this.dayEvent = dayClick;
			this.monthEvent = month;
			this.yearEvent = year;
			this.name = nameEvent;
			this.isAllDay = allDay;
			this.start = startTime;
			this.end = endTime;
			this.local = localEvent;
			this.description = eventDescription;
		}
		function createElementsToEvent(eventPos, deleteEvent){
			const eventDiv = document.createElement('div');
			eventDiv.classList.add('event');
			
			const eventName = document.createElement('input');
			eventName.type = 'text';
			eventName.value = eventPos.name;
			eventName.classList.add('eventName');
			eventName.setAttribute('readonly','readonly');
			
			const div1 = document.createElement('div');
			const label = document.createElement('lanel');
			label.for = 'eventAllDay';
			label.innerText = 'All Day';
			const eventAllDay = document.createElement('input');
			eventAllDay.type = 'checkbox';
			eventAllDay.checked = eventPos.isAllDay;
			eventAllDay.classList.add('eventAllDay');
			eventAllDay.setAttribute('disable','disable');
			
			const div2 = document.createElement('div');
			div2.innerHTML = '<ion-icon name="time-outline"></ion-icon>';
			const startTime = document.createElement('input');
			startTime.type = 'time';
			startTime.value = eventPos.start;
			startTime.classList.add('startEvent');
			startTime.setAttribute('readonly','readonly');
			
			const div3 = document.createElement('div');
			div3.innerHTML = '<ion-icon name="time-outline"></ion-icon>';
			const endTime = document.createElement('input');
			endTime.type = 'time';
			endTime.value = eventPos.end;
			endTime.classList.add('endEvent');
			endTime.setAttribute('readonly','readonly');
			
			const div4 = document.createElement('div');
			div4.innerHTML = '<ion-icon name="location-outline"></ion-icon>';
			const localEvent = document.createElement('input');
			localEvent.type = 'text';
			localEvent.value = eventPos.local;
			localEvent.classList.add('localEvent');
			localEvent.setAttribute('readonly','readonly');
			
			const description = document.createElement('textarea');
			description.classList.add('eventDescription');
			description.setAttribute('readonly','readonly');
			
			const eventConfigs = document.createElement('div');
			eventConfigs.classList.add('eventCongigs')
			const editBttn = document.createElement('button');
			editBttn.classList.add('editBttn');
			editBttn.innerText = 'Edit';
			const trashBttn = document.createElement('button');
			trashBttn.classList.add('trashBttn');
			trashBttn.innerText = 'Trash';
			
			div1.appendChild(label);
			div1.appendChild(eventAllDay);
			div2.appendChild(startTime);
			div3.appendChild(endTime);
			div4.append(localEvent);
			eventConfigs.appendChild(editBttn);
			eventConfigs.appendChild(trashBttn);
			
			eventDiv.appendChild(eventName);
			eventDiv.appendChild(div1);
			eventDiv.appendChild(div2);
			eventDiv.appendChild(div3);
			eventDiv.appendChild(div4);
			eventDiv.appendChild(description);
			eventDiv.appendChild(eventConfigs);
			
			eventsHTML.push(eventDiv);
			
			console.log(arrayEvents.length)
			trashBttn.addEventListener('click', ()=>{
				let deletObj = eventsHTML.indexOf(eventDiv)
				dayEventsList.removeChild(eventDiv)
				arrayEvents.splice(deletObj, 1)
				console.log(arrayEvents.length , deletObj)
			});
			editBttn.addEventListener('click', ()=>{
				if(editBttn.innerText == 'Edit'){
					editBttn.innerText = 'Save';
					
				}else if(editBttn.innerText == 'Save'){
					editBttn.innerText = 'Edit';
				
				}else{
					return;
				}
			});
			
		}
		
		arrayEvents.push(objEvent);
		
		if(arrayEvents.length > 0){
			for(let pos in arrayEvents){
				if(arrayEvents[pos].dayEvent == dayClick && arrayEvents[pos].monthEvent == month && arrayEvents[pos].yearEvent == year){
					createElementsToEvent(arrayEvents[pos]);
				}
			}//for
		}
		
	})//form
	
})//window

/*localStorage.setItem({'name', obj.name})*/