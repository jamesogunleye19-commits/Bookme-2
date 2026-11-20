import React, { useState } from "react";

function Button({ children, onClick }) {
  return (
    <button type="button" onClick={onClick}>
      {children}
    </button>
  );
}

export default function App() {
  const [page, setPage] = useState("login");
  const [role, setRole] = useState("customer");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [bookingDate, setBookingDate] = useState("");
  const [bookings, setBookings] = useState([]);

  const [services, setServices] = useState([
    { id: 1, name: "Hair Styling", category: "Beauty", price: 5000, provider: "Beauty Studio", description: "Professional hair styling services." },
    { id: 2, name: "Barbing", category: "Beauty", price: 3000, provider: "Fresh Cuts", description: "Professional haircut services." },
    { id: 3, name: "Photography", category: "Photography", price: 15000, provider: "James Photos", description: "Capture your special moments." },
    { id: 4, name: "Home Cleaning", category: "Cleaning", price: 10000, provider: "Clean Home", description: "Reliable home cleaning services." },
    { id: 5, name: "Fashion Design", category: "Fashion", price: 12000, provider: "Style House", description: "Custom fashion and tailoring." },
  ]);

  const [newService, setNewService] = useState({ name: "", category: "", price: "" });

  const money = (amount) => "₦" + Number(amount).toLocaleString("en-NG");

  const filteredServices = services.filter((service) =>
    `${service.name} ${service.category} ${service.provider}`.toLowerCase().includes(search.toLowerCase())
  );

  const providerName = name || "My Business";
  const providerServices = services.filter((s) => s.provider === providerName);
  const providerBookings = bookings.filter((b) => b.provider === providerName);
  const totalEarnings = providerBookings
    .filter((b) => b.status === "Completed")
    .reduce((total, b) => total + b.price, 0);

  function handleLogin(e) {
    e.preventDefault();
    if (!email || !password) {
      alert("Please enter your email and password.");
      return;
    }
    setPage(role === "provider" ? "provider" : "home");
  }

  function handleSignup(e) {
    e.preventDefault();
    if (!name || !email || !password) {
      alert("Please complete all fields.");
      return;
    }
    setPage(role === "provider" ? "provider" : "home");
  }

  function bookService() {
    if (!selected) return;
    if (!bookingDate) {
      alert("Please select a booking date.");
      return;
    }
    const booking = {
      id: Date.now(),
      service: selected.name,
      provider: selected.provider,
      price: selected.price,
      date: bookingDate,
      status: "Pending",
      customer: name || email,
    };
    setBookings((prev) => [...prev, booking]);
    setSelected(null);
    setBookingDate("");
    setPage("mybookings");
    alert("Your booking has been submitted!");
  }

  function addService(e) {
    e.preventDefault();
    if (!newService.name || !newService.category || !newService.price) {
      alert("Please complete all service details.");
      return;
    }
    const service = {
      id: Date.now(),
      name: newService.name,
      category: newService.category,
      price: Number(newService.price),
      provider: providerName,
      description: "Newly added service.",
    };
    setServices((prev) => [...prev, service]);
    setNewService({ name: "", category: "", price: "" });
    alert("Service added successfully!");
  }

  function updateBooking(id, status) {
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
  }

  function logout() {
    setPage("login");
    setEmail("");
    setPassword("");
    setName("");
    setSearch("");
    setSelected(null);
    setRole("customer");
  }

  return (
    <div>
      <header>
        <h2 onClick={() => page !== "login" && page !== "signup" && setPage("home")}>
          BookMe
        </h2>
        {page !== "login" && page !== "signup" && (
          <nav>
            <button onClick={() => setPage("home")}>Home</button>
            <button onClick={() => setPage("explore")}>Explore</button>
            <button onClick={() => setPage("mybookings")}>My Bookings</button>
            {role === "provider" && <button onClick={() => setPage("provider")}>Dashboard</button>}
            <button onClick={logout}>Logout</button>
          </nav>
        )}
      </header>

      <main>
        {page === "login" && (
          <section>
            <h1>Welcome Back</h1>
            <p>Login to your BookMe account.</p>
            <form onSubmit={handleLogin}>
              <input type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <br />
              <input type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              <button type="button" onClick={() => setShowPassword(!showPassword)}>{showPassword ? "Hide" : "Show"}</button>
              <br />
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="customer">Customer</option>
                <option value="provider">Service Provider</option>
              </select>
              <br />
              <button type="submit">Login</button>
            </form>
            <p>Don't have an account? <button onClick={() => setPage("signup")}>Sign Up</button></p>
          </section>
        )}

        {page === "signup" && (
          <section>
            <h1>Create Account</h1>
            <p>Join the BookMe community.</p>
            <form onSubmit={handleSignup}>
              <input type="text" placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} required />
              <br />
              <input type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <br />
              <input type="password" placeholder="Create password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              <br />
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="customer">Customer</option>
                <option value="provider">Service Provider</option>
              </select>
              <br />
              <button type="submit">Create Account</button>
            </form>
            <p>Already have an account? <button onClick={() => setPage("login")}>Login</button></p>
          </section>
        )}

        {page === "home" && (
          <section>
            <h1>Find and Book Services Easily</h1>
            <p>Book trusted professionals for your everyday needs.</p>
            <input type="text" placeholder="Search for services..." value={search} onChange={(e) => setSearch(e.target.value)} />
            <br />
            <Button onClick={() => setPage("explore")}>Explore Services</Button>
            <h2>Popular Services</h2>
            {services.slice(0, 3).map((service) => (
              <div key={service.id}>
                <h3>{service.name}</h3>
                <p>{service.description}</p>
                <p>{money(service.price)}</p>
                <Button onClick={() => { setSelected(service); setPage("booking"); }}>Book Now</Button>
              </div>
            ))}
          </section>
        )}

        {page === "explore" && (
          <section>
            <h1>Explore Services</h1>
            <input type="text" placeholder="Search services..." value={search} onChange={(e) => setSearch(e.target.value)} />
            {filteredServices.map((service) => (
              <div key={service.id}>
                <h2>{service.name}</h2>
                <p>{service.description}</p>
                <p>Category: {service.category}</p>
                <p>Provider: {service.provider}</p>
                <h3>{money(service.price)}</h3>
                <Button onClick={() => { setSelected(service); setPage("booking"); }}>Book Service</Button>
              </div>
            ))}
            {filteredServices.length === 0 && <p>No services found.</p>}
          </section>
        )}

        {page === "booking" && (
          <section>
            {selected ? (
              <>
                <h1>Book Service</h1>
                <h2>{selected.name}</h2>
                <p>Provider: {selected.provider}</p>
                <h2>{money(selected.price)}</h2>
                <label>Select Booking Date</label>
                <br />
                <input type="date" min={new Date().toISOString().split("T")[0]} value={bookingDate} onChange={(e) => setBookingDate(e.target.value)} />
                <br />
                <Button onClick={bookService}>Confirm Booking</Button>
                <Button onClick={() => setPage("explore")}>Cancel</Button>
              </>
            ) : (
              <p>No service selected.</p>
            )}
          </section>
        )}

        {page === "mybookings" && (
          <section>
            <h1>My Bookings</h1>
            {bookings.length === 0 ? (
              <p>You haven't made any bookings yet.</p>
            ) : (
              bookings.map((booking) => (
                <div key={booking.id}>
                  <h2>{booking.service}</h2>
                  <p>Provider: {booking.provider}</p>
                  <p>Date: {booking.date}</p>
                  <p>Price: {money(booking.price)}</p>
                  <p>Status: {booking.status}</p>
                </div>
              ))
            )}
          </section>
        )}

        {page === "provider" && (
          <section>
            <h1>Provider Dashboard</h1>
            <p>Welcome, {name || "Service Provider"}!</p>
            <div>
              <h3>Total Services: {providerServices.length}</h3>
              <h3>Total Bookings: {providerBookings.length}</h3>
              <h3>Completed Earnings: {money(totalEarnings)}</h3>
            </div>

            <h2>Add New Service</h2>
            <form onSubmit={addService}>
              <input type="text" placeholder="Service name" value={newService.name} onChange={(e) => setNewService({ ...newService, name: e.target.value })} required />
              <br />
              <input type="text" placeholder="Category" value={newService.category} onChange={(e) => setNewService({ ...newService, category: e.target.value })} required />
              <br />
              <input type="number" placeholder="Service price" value={newService.price} onChange={(e) => setNewService({ ...newService, price: e.target.value })} required />
              <br />
              <button type="submit">Add Service</button>
            </form>

            <h2>Manage Bookings</h2>
            {providerBookings.length === 0 ? (
              <p>No bookings yet.</p>
            ) : (
              providerBookings.map((booking) => (
                <div key={booking.id}>
                  <h3>{booking.service}</h3>
                  <p>Customer: {booking.customer}</p>
                  <p>Date: {booking.date}</p>
                  <p>Amount: {money(booking.price)}</p>
                  <p>Status: {booking.status}</p>
                  <button onClick={() => updateBooking(booking.id, "Accepted")}>Accept</button>
                  <button onClick={() => updateBooking(booking.id, "Completed")}>Mark Completed</button>
                  <button onClick={() => updateBooking(booking.id, "Cancelled")}>Cancel</button>
                </div>
              ))
            )}

            <h2>My Services</h2>
            {providerServices.length === 0 ? (
              <p>You haven't added any services yet.</p>
            ) : (
              providerServices.map((service) => (
                <div key={service.id}>
                  <h3>{service.name}</h3>
                  <p>{service.category}</p>
                  <p>{money(service.price)}</p>
                </div>
              ))
            )}
          </section>
        )}
      </main>

      <footer>
        <h2>BookMe</h2>
        <p>Making service booking simple and convenient.</p>
        <p>© 2026 BookMe. All rights reserved.</p>
      </footer>
    </div>
  );
}
