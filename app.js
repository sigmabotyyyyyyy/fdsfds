class BookingDatabase {
  constructor() {
    this.key = 'minicure_bookings';
    this.bookings = this.loadBookings();
  }

  loadBookings() {
    const data = localStorage.getItem(this.key);
    return data ? JSON.parse(data) : [];
  }

  saveBookings() {
    localStorage.setItem(this.key, JSON.stringify(this.bookings));
  }

  addBooking(name, phone, date, time) {
    const newBooking = {
      id: Date.now(),
      name,
      phone,
      date,
      time,
      createdAt: new Date().toISOString()
    };
    this.bookings.push(newBooking);
    this.saveBookings();
    return newBooking;
  }

  getAllBookings() {
    return this.bookings;
  }

  removeBooking(id) {
    this.bookings = this.bookings.filter(b => b.id !== id);
    this.saveBookings();
  }
}

const db = new BookingDatabase();
const bookingForm = document.getElementById('bookingForm');
const bookingList = document.getElementById('bookingList');

function renderBookings() {
  bookingList.innerHTML = '';
  db.getAllBookings().forEach(booking => {
    const li = document.createElement('li');
    li.textContent = `${booking.name} | ${booking.phone} | ${booking.date} ${booking.time}`;
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Удалить';
    deleteBtn.onclick = () => {
      db.removeBooking(booking.id);
      renderBookings();
    };
    li.appendChild(deleteBtn);
    bookingList.appendChild(li);
  });
}

bookingForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;

  db.addBooking(name, phone, date, time);
  bookingForm.reset();
  renderBookings();
});

renderBookings();
