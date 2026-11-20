
import React, { useState } from "react";
import "./App.css";

function Button({ children, onClick }) {
  return (
    <button type="button" onClick={onClick}>
      {children}
    </button>
  );
}

export default function App() {
  const [page, setPage] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [bookings, setBookings] = useState([]);

  const [services] = useState([
    { id: 1, name: "Barber", category: "Beauty", price: 5000 },
    { id: 2, name: "Hair Stylist", category: "Beauty", price: 8000 },
    { id: 3, name: "Plumber", category: "Home", price: 10000 },
    { id: 4, name: "Electrician", category: "Home", price: 12000 },
    { id: 5, name: "Photographer", category: "Events", price: 20000 },
    { id: 6, name: "Makeup Artist", category: "Beauty", price: 15000 }
  ]);

  const filteredServices = services.filter((service) =>
    service.name.toLowerCase().includes(search.toLowerCase())
  );

  function login(e) {
    e.preventDefault();
    if (!email || !password) {
      alert("Please enter your email and password.");
      return;
    }
    setPage("home");
  }

  function signup(e) {
    e.preventDefault();
    if (!name || !email || !password) {
      alert("Please complete all fields.");
      return;
    }
    setPage("home");
  }

  function bookService(e) {
    e.preventDefault();

    if (!date || !time) {
      alert("Please select a date and time.");
      return;
    }

    const newBooking = {
      id: Date.now(),
      service: selected.name,
      price: selected.price,
      date,
      time,
      status: "Pending"
    };

    setBookings([...bookings, newBooking]);
    setSelected(null);
    setPage("bookings");
    alert("Your booking has been submitted!");
  }

  function logout() {
    setPage("login");
    setPassword("");
  }

  const money = (amount) => `₦${amount.toLocaleString()}`;

  return (
    <div className="app">

      <header className="navbar">
        <h2 className="logo">Book<span>Me</span></h2>

        <nav>
          <button onClick={() => setPage("home")}>Home</button>
          <button onClick={() => setPage("explore")}>Explore</button>
          <button onClick={() => setPage("bookings")}>Bookings</button>
          <button onClick={() => setPage("about")}>About</button>
          <button onClick={() => setPage("contact")}>Contact</button>
          <button onClick={() => setPage("dashboard")}>Dashboard</button>
        </nav>

        <button className="logout" onClick={logout}>Logout</button>
      </header>

      {page === "login" && (
        <section className="auth-section">
          <form className="auth-card" onSubmit={login}>
            <h1>Welcome Back</h1>
            <p>Login to your BookMe account</p>

            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="password-box">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <button className="primary-btn">Login</button>

            <p>
              Don't have an account?
              <span onClick={() => setPage("signup")}> Sign up</span>
            </p>
          </form>
        </section>
      )}

      {page === "signup" && (
        <section className="auth-section">
          <form className="auth-card" onSubmit={signup}>
            <h1>Create Account</h1>
            <p>Join BookMe today</p>

            <input
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Create password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="primary-btn">Create Account</button>

            <p>
              Already have an account?
              <span onClick={() => setPage("login")}> Login</span>
            </p>
          </form>
        </section>
      )}

      {page === "home" && (
        <>
          <section className="hero">
            <h1>Book Services Easily With BookMe</h1>
            <p>Find trusted professionals and book services in minutes.</p>
            <button onClick={() => setPage("explore")}>
              Explore Services
            </button>
          </section>

          <section className="section">
            <h2>Popular Services</h2>
            <div className="service-grid">
              {services.slice(0, 4).map((service) => (
                <div className="service-card" key={service.id}>
                  <h3>{service.name}</h3>
                  <p>{service.category}</p>
                  <h3>{money(service.price)}</h3>
                  <button onClick={() => {
                    setSelected(service);
                    setPage("booking");
                  }}>
                    Book Now
                  </button>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {page === "explore" && (
        <section className="section">
          <h1>Explore Services</h1>
          <input
            className="search"
            placeholder="Search for a service..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="service-grid">
            {filteredServices.map((service) => (
              <div className="service-card" key={service.id}>
                <h3>{service.name}</h3>
                <p>{service.category}</p>
                <h3>{money(service.price)}</h3>
                <button onClick={() => {
                  setSelected(service);
                  setPage("booking");
                }}>
                  Book Now
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {page === "booking" && selected && (
        <section className="section booking-section">
          <form className="auth-card" onSubmit={bookService}>
            <h1>Book {selected.name}</h1>
            <h3>{money(selected.price)}</h3>

            <label>Select Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />

            <label>Select Time</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />

            <button className="primary-btn">Confirm Booking</button>
            <Button onClick={() => setPage("explore")}>Cancel</Button>
          </form>
        </section>
      )}

      {page === "bookings" && (
        <section className="section">
          <h1>My Bookings</h1>

          {bookings.length === 0 ? (
            <p>You have no bookings yet.</p>
          ) : (
            bookings.map((booking) => (
              <div className="booking-card" key={booking.id}>
                <h3>{booking.service}</h3>
                <p>Date: {booking.date}</p>
                <p>Time: {booking.time}</p>
                <p>Price: {money(booking.price)}</p>
                <span>{booking.status}</span>
              </div>
            ))
          )}
        </section>
      )}

      {page === "dashboard" && (
        <section className="section">
          <h1>Provider Dashboard</h1>

          <div className="dashboard-grid">
            <div className="dashboard-card">
              <h3>Total Bookings</h3>
              <h1>{bookings.length}</h1>
            </div>

            <div className="dashboard-card">
              <h3>Pending Bookings</h3>
              <h1>{bookings.filter(b => b.status === "Pending").length}</h1>
            </div>

            <div className="dashboard-card">
              <h3>Services Available</h3>
              <h1>{services.length}</h1>
            </div>
          </div>

          <h2>Recent Bookings</h2>
          {bookings.map((booking) => (
            <div className="booking-card" key={booking.id}>
              <h3>{booking.service}</h3>
              <p>{booking.date} at {booking.time}</p>
              <p>{money(booking.price)}</p>
              <p>{booking.status}</p>
            </div>
          ))}
        </section>
      )}

      {page === "about" && (
        <section className="section">
          <h1>About BookMe</h1>
          <p>
            BookMe connects customers with trusted service providers.
            Our goal is to make booking services simple, quick and convenient.
          </p>
        </section>
      )}

      {page === "contact" && (
        <section className="section">
          <h1>Contact Us</h1>
          <p>Email: support@bookme.com</p>
          <p>Phone: Add your business phone number</p>
        </section>
      )}

      <footer className="footer">
        <h2>BookMe</h2>
        <p>Book services. Save time. Get things done.</p>
        <p>© 2026 BookMe. All rights reserved.</p>
      </footer>

    </div>
  );
}
