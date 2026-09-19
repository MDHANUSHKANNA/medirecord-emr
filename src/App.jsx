import { useEffect, useMemo, useState } from "react";
import "./App.css";

/* =========================================================
   INITIAL PATIENTS
========================================================= */

const initialPatients = [
  {
    id: "MR-1001",
    name: "Arun Kumar",
    age: 32,
    gender: "Male",
    phone: "+91 98765 43210",
    blood: "B+",
    status: "Active",
    condition: "Hypertension",
  },
  {
    id: "MR-1002",
    name: "Priya Sharma",
    age: 28,
    gender: "Female",
    phone: "+91 98765 12345",
    blood: "O+",
    status: "Active",
    condition: "Diabetes",
  },
  {
    id: "MR-1003",
    name: "Ravi Kumar",
    age: 45,
    gender: "Male",
    phone: "+91 99887 77665",
    blood: "A+",
    status: "Follow-up",
    condition: "Asthma",
  },
  {
    id: "MR-1004",
    name: "Meena Devi",
    age: 36,
    gender: "Female",
    phone: "+91 91234 56789",
    blood: "AB+",
    status: "Active",
    condition: "Migraine",
  },
  {
    id: "MR-1005",
    name: "Suresh Babu",
    age: 51,
    gender: "Male",
    phone: "+91 90000 11223",
    blood: "O+",
    status: "Active",
    condition: "Routine Checkup",
  },
];

/* =========================================================
   INITIAL APPOINTMENTS
========================================================= */

const initialAppointments = [
  {
    id: 1,
    date: getTodayISO(),
    time: "09:30 AM",
    patient: "Arun Kumar",
    doctor: "Dr. Rajesh",
    type: "General Checkup",
    status: "Confirmed",
  },
  {
    id: 2,
    date: getTodayISO(),
    time: "10:15 AM",
    patient: "Priya Sharma",
    doctor: "Dr. Rajesh",
    type: "Follow-up",
    status: "Confirmed",
  },
  {
    id: 3,
    date: getTodayISO(),
    time: "11:30 AM",
    patient: "Ravi Kumar",
    doctor: "Dr. Mehta",
    type: "Consultation",
    status: "Waiting",
  },
  {
    id: 4,
    date: getTodayISO(),
    time: "02:00 PM",
    patient: "Meena Devi",
    doctor: "Dr. Rajesh",
    type: "General Checkup",
    status: "Confirmed",
  },
];

/* =========================================================
   INITIAL MEDICAL HISTORY
========================================================= */

const initialMedicalHistory = [
  {
    id: 1,
    patient: "Arun Kumar",
    date: "2026-09-18",
    type: "General Consultation",
    details:
      "Routine follow-up consultation. Blood pressure reviewed.",
    doctor: "Dr. Rajesh",
  },
  {
    id: 2,
    patient: "Arun Kumar",
    date: "2026-09-02",
    type: "Blood Test",
    details:
      "Routine laboratory investigation completed.",
    doctor: "Lab Department",
  },
  {
    id: 3,
    patient: "Priya Sharma",
    date: "2026-09-15",
    type: "General Consultation",
    details:
      "Diabetes follow-up and medication review.",
    doctor: "Dr. Rajesh",
  },
  {
    id: 4,
    patient: "Priya Sharma",
    date: "2026-08-20",
    type: "Laboratory Report",
    details:
      "Routine blood glucose investigation completed.",
    doctor: "Lab Department",
  },
  {
    id: 5,
    patient: "Ravi Kumar",
    date: "2026-09-10",
    type: "Consultation",
    details:
      "Asthma follow-up consultation.",
    doctor: "Dr. Mehta",
  },
  {
    id: 6,
    patient: "Meena Devi",
    date: "2026-09-12",
    type: "Consultation",
    details:
      "Migraine symptoms reviewed.",
    doctor: "Dr. Rajesh",
  },
];

/* =========================================================
   MENU
========================================================= */

const menuItems = [
  { name: "Dashboard", icon: "▦" },
  { name: "Patients", icon: "♙" },
  { name: "Appointments", icon: "▣" },
  { name: "Consultations", icon: "⚕" },
  { name: "Prescriptions", icon: "▤" },
  { name: "Lab Reports", icon: "⌬" },
];

/* =========================================================
   HELPER FUNCTIONS
========================================================= */

function getTodayISO() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatTime(time) {
  if (!time) return "";

  const [hours, minutes] = time.split(":");
  let hour = Number(hours);

  const ampm = hour >= 12 ? "PM" : "AM";

  hour = hour % 12 || 12;

  return `${String(hour).padStart(2, "0")}:${minutes} ${ampm}`;
}

function formatDate(date) {
  if (!date) return "";

  const d = new Date(date);

  if (Number.isNaN(d.getTime())) return date;

  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatShortDate(date) {
  if (!date) return "";

  const d = new Date(date);

  if (Number.isNaN(d.getTime())) return date;

  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
  });
}

/* =========================================================
   SEARCHABLE DROPDOWN
========================================================= */

function SearchableDropdown({
  options,
  value,
  onChange,
  placeholder = "Select...",
  searchPlaceholder = "Search...",
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    function handleOutsideClick(event) {
      if (!event.target.closest(".searchable-select")) {
        setOpen(false);
        setSearch("");
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [open]);

  const selectedOption = options.find(
    (option) => String(option.value) === String(value)
  );

  const filteredOptions = options.filter((option) =>
    `${option.label} ${option.subLabel || ""}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  function selectOption(optionValue) {
    onChange(optionValue);
    setOpen(false);
    setSearch("");
  }

  return (
    <div className="searchable-select">
      <button
        type="button"
        className="searchable-select-button"
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className={selectedOption ? "" : "placeholder-text"}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <span className={`dropdown-arrow ${open ? "open" : ""}`}>
          ▾
        </span>
      </button>

      {open && (
        <div className="searchable-dropdown">
          <div className="dropdown-search">
            <span className="search-icon">⌕</span>
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          <div className="dropdown-options">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <button
                  type="button"
                  key={String(option.value)}
                  className={`dropdown-option ${
                    String(value) === String(option.value)
                      ? "selected"
                      : ""
                  }`}
                  onClick={() => selectOption(option.value)}
                >
                  <div className="dropdown-option-content">
                    <strong>{option.label}</strong>
                    {option.subLabel && (
                      <small>{option.subLabel}</small>
                    )}
                  </div>

                  {String(value) === String(option.value) && (
                    <span className="check-mark">✓</span>
                  )}
                </button>
              ))
            ) : (
              <div className="no-options">No results found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* =========================================================
   APP
========================================================= */

function App() {
  const [activePage, setActivePage] = useState("Dashboard");

  /* ---------------- PATIENTS ---------------- */

  const [patients, setPatients] = useState(() => {
    try {
      const saved = localStorage.getItem("medirecord_patients");
      return saved ? JSON.parse(saved) : initialPatients;
    } catch {
      return initialPatients;
    }
  });

  /* ---------------- APPOINTMENTS ---------------- */

  const [appointments, setAppointments] = useState(() => {
    try {
      const saved = localStorage.getItem(
        "medirecord_appointments"
      );

      return saved
        ? JSON.parse(saved)
        : initialAppointments;
    } catch {
      return initialAppointments;
    }
  });

  /* ---------------- MEDICAL HISTORY ---------------- */

  const [medicalHistory, setMedicalHistory] = useState(() => {
    try {
      const saved = localStorage.getItem(
        "medirecord_history_v2"
      );

      return saved
        ? JSON.parse(saved)
        : initialMedicalHistory;
    } catch {
      return initialMedicalHistory;
    }
  });

  /* ---------------- UI STATE ---------------- */

  const [search, setSearch] = useState("");
  const [showAddPatient, setShowAddPatient] =
    useState(false);

  const [selectedPatient, setSelectedPatient] =
    useState(null);

  const [toast, setToast] = useState("");

  /* =========================================================
     NEW PATIENT
  ========================================================= */

  const [newPatient, setNewPatient] = useState({
    name: "",
    age: "",
    gender: "Male",
    phone: "",
    blood: "O+",
  });

  /* =========================================================
     APPOINTMENT FORM
  ========================================================= */

  const [appointmentForm, setAppointmentForm] = useState({
    patient: "",
    date: getTodayISO(),
    time: "09:00",
    doctor: "Dr. Rajesh",
    type: "General Checkup",
  });

  /* =========================================================
     CONSULTATION FORM
  ========================================================= */

  const [consultation, setConsultation] = useState({
    patient: "Arun Kumar",
    symptoms: "",
    bp: "",
    pulse: "",
    temperature: "",
    diagnosis: "",
    notes: "",
  });

  /* =========================================================
     PRESCRIPTION FORM
  ========================================================= */

  const [prescription, setPrescription] = useState({
    patient: "Arun Kumar",
    medicine: "",
    dosage: "",
    frequency: "Once daily",
    duration: "",
  });

  /* =========================================================
     LAB FORM
  ========================================================= */

  const [labReport, setLabReport] = useState({
    patient: "Arun Kumar",
    test: "",
    result: "",
    status: "Pending",
  });

  /* =========================================================
     LOCAL STORAGE
  ========================================================= */

  useEffect(() => {
    localStorage.setItem(
      "medirecord_patients",
      JSON.stringify(patients)
    );
  }, [patients]);

  useEffect(() => {
    localStorage.setItem(
      "medirecord_appointments",
      JSON.stringify(appointments)
    );
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem(
      "medirecord_history_v2",
      JSON.stringify(medicalHistory)
    );
  }, [medicalHistory]);

  /* =========================================================
     FILTER PATIENTS
  ========================================================= */

  const filteredPatients = useMemo(() => {
    const query = search.toLowerCase().trim();

    if (!query) return patients;

    return patients.filter(
      (patient) =>
        patient.name.toLowerCase().includes(query) ||
        patient.id.toLowerCase().includes(query) ||
        patient.phone.toLowerCase().includes(query)
    );
  }, [patients, search]);

  /* =========================================================
     TOAST
  ========================================================= */

  function showToast(message) {
    setToast(message);

    setTimeout(() => {
      setToast("");
    }, 2500);
  }

  /* =========================================================
     NAVIGATION
  ========================================================= */

  function goTo(page) {
    setActivePage(page);
    setSelectedPatient(null);
  }

  /* =========================================================
     ADD PATIENT
  ========================================================= */

  function addPatient(e) {
    e.preventDefault();

    if (
      !newPatient.name ||
      !newPatient.age ||
      !newPatient.phone
    ) {
      showToast("Please complete the required fields.");
      return;
    }

    const nextNumber =
      Math.max(
        ...patients.map((p) =>
          Number(p.id.replace("MR-", ""))
        ),
        1000
      ) + 1;

    const patient = {
      id: `MR-${nextNumber}`,
      name: newPatient.name,
      age: Number(newPatient.age),
      gender: newPatient.gender,
      phone: newPatient.phone,
      blood: newPatient.blood,
      status: "Active",
      condition: "New Patient",
    };

    setPatients((prev) => [patient, ...prev]);

    setNewPatient({
      name: "",
      age: "",
      gender: "Male",
      phone: "",
      blood: "O+",
    });

    setShowAddPatient(false);

    showToast("Patient added successfully.");
  }

  /* =========================================================
     CREATE APPOINTMENT
  ========================================================= */

  function createAppointment(e) {
    e.preventDefault();

    if (!appointmentForm.patient) {
      showToast("Please select a patient.");
      return;
    }

    const newAppointment = {
      id: Date.now(),
      date: appointmentForm.date,
      time: formatTime(appointmentForm.time),
      patient: appointmentForm.patient,
      doctor: appointmentForm.doctor,
      type: appointmentForm.type,
      status: "Confirmed",
    };

    setAppointments((prev) => [
      ...prev,
      newAppointment,
    ]);

    setAppointmentForm((prev) => ({
      ...prev,
      patient: "",
    }));

    showToast("Appointment scheduled successfully.");
  }

  /* =========================================================
     SAVE CONSULTATION
  ========================================================= */

  function saveConsultation(e) {
    e.preventDefault();

    if (!consultation.patient) {
      showToast("Please select a patient.");
      return;
    }

    const details = [
      consultation.symptoms
        ? `Symptoms: ${consultation.symptoms}`
        : "",

      consultation.bp
        ? `BP: ${consultation.bp}`
        : "",

      consultation.pulse
        ? `Pulse: ${consultation.pulse}`
        : "",

      consultation.temperature
        ? `Temperature: ${consultation.temperature}`
        : "",

      consultation.diagnosis
        ? `Diagnosis: ${consultation.diagnosis}`
        : "",

      consultation.notes
        ? `Notes: ${consultation.notes}`
        : "",
    ]
      .filter(Boolean)
      .join(" • ");

    const newRecord = {
      id: Date.now(),
      patient: consultation.patient,
      date: new Date().toISOString(),
      type: "General Consultation",
      details:
        details || "General consultation completed.",
      doctor: "Dr. Rajesh",
    };

    setMedicalHistory((prev) => [
      newRecord,
      ...prev,
    ]);

    setConsultation((prev) => ({
      ...prev,
      symptoms: "",
      bp: "",
      pulse: "",
      temperature: "",
      diagnosis: "",
      notes: "",
    }));

    showToast(
      "Consultation saved to patient history."
    );
  }

  /* =========================================================
     SAVE PRESCRIPTION
  ========================================================= */

  function savePrescription(e) {
    e.preventDefault();

    if (!prescription.patient) {
      showToast("Please select a patient.");
      return;
    }

    if (
      !prescription.medicine ||
      !prescription.dosage
    ) {
      showToast("Please enter medicine and dosage.");
      return;
    }

    const newRecord = {
      id: Date.now(),
      patient: prescription.patient,
      date: new Date().toISOString(),
      type: "Prescription",
      details: `${prescription.medicine} — ${
        prescription.dosage
      } — ${prescription.frequency}${
        prescription.duration
          ? ` — ${prescription.duration}`
          : ""
      }`,
      doctor: "Dr. Rajesh",
    };

    setMedicalHistory((prev) => [
      newRecord,
      ...prev,
    ]);

    setPrescription((prev) => ({
      ...prev,
      medicine: "",
      dosage: "",
      duration: "",
    }));

    showToast(
      "Prescription saved to patient history."
    );
  }

  /* =========================================================
     SAVE LAB REPORT
  ========================================================= */

  function saveLabReport(e) {
    e.preventDefault();

    if (!labReport.patient) {
      showToast("Please select a patient.");
      return;
    }

    if (!labReport.test) {
      showToast("Please enter the test name.");
      return;
    }

    const newRecord = {
      id: Date.now(),
      patient: labReport.patient,
      date: new Date().toISOString(),
      type: "Laboratory Report",
      details: `${labReport.test} — Result: ${
        labReport.result || "Pending"
      } — Status: ${labReport.status}`,
      doctor: "Lab Department",
    };

    setMedicalHistory((prev) => [
      newRecord,
      ...prev,
    ]);

    setLabReport((prev) => ({
      ...prev,
      test: "",
      result: "",
      status: "Pending",
    }));

    showToast(
      "Lab report saved to patient history."
    );
  }

  /* =========================================================
     MAIN UI
  ========================================================= */

  return (
    <div className="app">

      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <aside className="sidebar">

        <div className="brand">
          <div className="brand-icon">✚</div>

          <div>
            <h2>MediRecord</h2>
            <span>EMR Platform</span>
          </div>
        </div>

        <div className="menu-title">
          MAIN MENU
        </div>

        <nav>
          {menuItems.map((item) => (
            <button
              key={item.name}
              className={`menu-item ${
                activePage === item.name
                  ? "active"
                  : ""
              }`}
              onClick={() => goTo(item.name)}
            >
              <span className="menu-icon">
                {item.icon}
              </span>

              {item.name}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">

          <button
            className={`menu-item ${
              activePage === "Settings"
                ? "active"
                : ""
            }`}
            onClick={() => goTo("Settings")}
          >
            <span className="menu-icon">
              ⚙
            </span>

            Settings
          </button>

          <div className="doctor-card">
            <div className="doctor-avatar">
              DR
            </div>

            <div>
              <strong>Dr. Rajesh</strong>
              <small>Administrator</small>
            </div>
          </div>

        </div>
      </aside>

      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="main">

        <header className="topbar">

          <div>
            <p className="welcome">
              Welcome back, Doctor 👋
            </p>

            <h1>{activePage}</h1>
          </div>

          <div className="top-actions">

            <button className="notification">
              ♧
            </button>

            <div className="profile">

              <div className="profile-avatar">
                DR
              </div>

              <div>
                <strong>Dr. Rajesh</strong>
                <small>
                  General Physician
                </small>
              </div>

            </div>

          </div>
        </header>

        {/* ===================================================
            DASHBOARD
        =================================================== */}

        {activePage === "Dashboard" && (
          <Dashboard
            patients={patients}
            appointments={appointments}
            medicalHistory={medicalHistory}
            goTo={goTo}
          />
        )}

        {/* ===================================================
            PATIENTS
        =================================================== */}

        {activePage === "Patients" && (
          <PatientsPage
            patients={patients}
            search={search}
            setSearch={setSearch}
            filteredPatients={filteredPatients}
            setShowAddPatient={
              setShowAddPatient
            }
            setSelectedPatient={
              setSelectedPatient
            }
            selectedPatient={selectedPatient}
            medicalHistory={medicalHistory}
          />
        )}

        {/* ===================================================
            APPOINTMENTS
        =================================================== */}

        {activePage === "Appointments" && (
          <AppointmentsPage
            appointments={appointments}
            appointmentForm={appointmentForm}
            setAppointmentForm={
              setAppointmentForm
            }
            patients={patients}
            createAppointment={
              createAppointment
            }
          />
        )}

        {/* ===================================================
            CONSULTATIONS
        =================================================== */}

        {activePage === "Consultations" && (
          <ConsultationPage
            consultation={consultation}
            setConsultation={
              setConsultation
            }
            patients={patients}
            saveConsultation={
              saveConsultation
            }
          />
        )}

        {/* ===================================================
            PRESCRIPTIONS
        =================================================== */}

        {activePage === "Prescriptions" && (
          <PrescriptionPage
            prescription={prescription}
            setPrescription={
              setPrescription
            }
            patients={patients}
            savePrescription={
              savePrescription
            }
          />
        )}

        {/* ===================================================
            LAB REPORTS
        =================================================== */}

        {activePage === "Lab Reports" && (
          <LabPage
            labReport={labReport}
            setLabReport={setLabReport}
            patients={patients}
            saveLabReport={
              saveLabReport
            }
          />
        )}

        {/* ===================================================
            SETTINGS
        =================================================== */}

        {activePage === "Settings" && (
          <SettingsPage />
        )}

      </main>

      {/* =====================================================
          ADD PATIENT MODAL
      ===================================================== */}

      {showAddPatient && (
        <div className="modal-overlay">

          <form
            className="modal"
            onSubmit={addPatient}
          >

            <div className="modal-header">

              <div>
                <h2>Add New Patient</h2>

                <p>
                  Create a new patient record
                </p>
              </div>

              <button
                type="button"
                className="close-button"
                onClick={() =>
                  setShowAddPatient(false)
                }
              >
                ×
              </button>

            </div>

            <div className="form-grid">

              <label>
                Full Name *

                <input
                  value={newPatient.name}
                  onChange={(e) =>
                    setNewPatient({
                      ...newPatient,
                      name: e.target.value,
                    })
                  }
                  placeholder="Enter patient name"
                />
              </label>

              <label>
                Age *

                <input
                  type="number"
                  value={newPatient.age}
                  onChange={(e) =>
                    setNewPatient({
                      ...newPatient,
                      age: e.target.value,
                    })
                  }
                  placeholder="Age"
                />
              </label>

              <label>
                Gender

                <SearchableDropdown
                  options={[
                    { value: "Male", label: "Male" },
                    { value: "Female", label: "Female" },
                    { value: "Other", label: "Other" },
                  ]}
                  value={newPatient.gender}
                  onChange={(gender) =>
                    setNewPatient({
                      ...newPatient,
                      gender,
                    })
                  }
                  placeholder="Select gender"
                  searchPlaceholder="Search gender..."
                />
              </label>

              <label>
                Blood Group

                <SearchableDropdown
                  options={[
                    { value: "A+", label: "A+" },
                    { value: "A-", label: "A-" },
                    { value: "B+", label: "B+" },
                    { value: "B-", label: "B-" },
                    { value: "AB+", label: "AB+" },
                    { value: "AB-", label: "AB-" },
                    { value: "O+", label: "O+" },
                    { value: "O-", label: "O-" },
                  ]}
                  value={newPatient.blood}
                  onChange={(blood) =>
                    setNewPatient({
                      ...newPatient,
                      blood,
                    })
                  }
                  placeholder="Select blood group"
                  searchPlaceholder="Search blood group..."
                />
              </label>

              <label className="full">
                Phone Number *

                <input
                  value={newPatient.phone}
                  onChange={(e) =>
                    setNewPatient({
                      ...newPatient,
                      phone: e.target.value,
                    })
                  }
                  placeholder="+91 XXXXX XXXXX"
                />
              </label>

            </div>

            <div className="modal-actions">

              <button
                type="button"
                className="secondary-button"
                onClick={() =>
                  setShowAddPatient(false)
                }
              >
                Cancel
              </button>

              <button className="primary-button">
                Create Patient
              </button>

            </div>

          </form>
        </div>
      )}

      {/* =====================================================
          TOAST
      ===================================================== */}

      {toast && (
        <div className="toast">
          {toast}
        </div>
      )}

    </div>
  );
}

/* =========================================================
   DASHBOARD
========================================================= */

function Dashboard({
  patients,
  appointments,
  medicalHistory,
  goTo,
}) {
  const today = getTodayISO();

  const todayAppointments =
    appointments.filter(
      (appointment) =>
        appointment.date === today
    );

  return (
    <>
      <section className="stats">

        <StatCard
          icon="♙"
          title="Total Patients"
          value={patients.length}
          note="Registered patients"
          type="blue"
        />

        <StatCard
          icon="▣"
          title="Today's Appointments"
          value={todayAppointments.length}
          note="Scheduled today"
          type="green"
        />

        <StatCard
          icon="⚕"
          title="Medical Records"
          value={medicalHistory.length}
          note="Total records"
          type="purple"
        />

        <StatCard
          icon="⌬"
          title="Pending Reports"
          value={
            medicalHistory.filter(
              (record) =>
                record.type ===
                "Laboratory Report" &&
                record.details.includes(
                  "Pending"
                )
            ).length
          }
          note="Need review"
          type="orange"
        />

      </section>

      <section className="content-grid">

        {/* RECENT PATIENTS */}

        <div className="panel">

          <PanelHeader
            title="Recent Patients"
            subtitle="Recently added patients"
            action="View all"
            onClick={() =>
              goTo("Patients")
            }
          />

          <div className="table">

            <div className="table-row table-head">
              <span>Patient</span>
              <span>ID</span>
              <span>Age</span>
              <span>Status</span>
            </div>

            {patients
              .slice(0, 4)
              .map((patient) => (
                <div
                  className="table-row"
                  key={patient.id}
                >

                  <span className="patient-name">

                    <div className="small-avatar">
                      {patient.name.charAt(0)}
                    </div>

                    {patient.name}

                  </span>

                  <span>{patient.id}</span>

                  <span>{patient.age}</span>

                  <span>
                    <b
                      className={`status ${
                        patient.status ===
                        "Active"
                          ? "active-status"
                          : "follow-status"
                      }`}
                    >
                      {patient.status}
                    </b>
                  </span>

                </div>
              ))}

          </div>

        </div>

        {/* APPOINTMENTS */}

        <div className="panel">

          <PanelHeader
            title="Today's Appointments"
            subtitle={formatDate(today)}
            action="View all"
            onClick={() =>
              goTo("Appointments")
            }
          />

          <div className="appointments">

            {todayAppointments
              .slice(0, 4)
              .map((appointment) => (
                <div
                  className="appointment"
                  key={appointment.id}
                >

                  <div className="appointment-time">
                    {appointment.time}
                  </div>

                  <div className="appointment-info">
                    <strong>
                      {appointment.patient}
                    </strong>

                    <span>
                      {appointment.type}
                    </span>
                  </div>

                  <div className="appointment-doctor">
                    {appointment.doctor}
                  </div>

                </div>
              ))}

            {todayAppointments.length === 0 && (
              <div className="empty-state">
                No appointments today.
              </div>
            )}

          </div>

        </div>

      </section>

      {/* QUICK ACTIONS */}

      <section className="quick-actions">

        <h2>Quick Actions</h2>

        <div className="quick-grid">

          <QuickAction
            icon="＋"
            title="Add Patient"
            description="Create a new patient record"
            onClick={() =>
              goTo("Patients")
            }
          />

          <QuickAction
            icon="▣"
            title="New Appointment"
            description="Schedule a patient visit"
            onClick={() =>
              goTo("Appointments")
            }
          />

          <QuickAction
            icon="⚕"
            title="Start Consultation"
            description="Open clinical consultation"
            onClick={() =>
              goTo("Consultations")
            }
          />

          <QuickAction
            icon="▤"
            title="Prescription"
            description="Create a prescription"
            onClick={() =>
              goTo("Prescriptions")
            }
          />

        </div>

      </section>
    </>
  );
}

function StatCard({
  icon,
  title,
  value,
  note,
  type,
}) {
  return (
    <div className="stat-card">

      <div className={`stat-icon ${type}`}>
        {icon}
      </div>

      <div>
        <span>{title}</span>

        <strong>{value}</strong>

        <small>{note}</small>
      </div>

    </div>
  );
}

function PanelHeader({
  title,
  subtitle,
  action,
  onClick,
}) {
  return (
    <div className="panel-header">

      <div>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>

      {action && (
        <button
          className="view-button"
          onClick={onClick}
        >
          {action}
        </button>
      )}

    </div>
  );
}

function QuickAction({
  icon,
  title,
  description,
  onClick,
}) {
  return (
    <button
      className="quick-action"
      onClick={onClick}
    >
      <span>{icon}</span>

      <strong>{title}</strong>

      <small>{description}</small>
    </button>
  );
}

/* =========================================================
   PATIENTS PAGE
========================================================= */

function PatientsPage({
  patients,
  search,
  setSearch,
  filteredPatients,
  setShowAddPatient,
  setSelectedPatient,
  selectedPatient,
  medicalHistory,
}) {
  if (selectedPatient) {
    return (
      <PatientProfile
        patient={selectedPatient}
        medicalHistory={medicalHistory}
        onBack={() =>
          setSelectedPatient(null)
        }
      />
    );
  }

  return (
    <>
      <div className="page-toolbar">

        <div>
          <h2>Patient Management</h2>

          <p>
            Search and manage patient records
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() =>
            setShowAddPatient(true)
          }
        >
          ＋ Add Patient
        </button>

      </div>

      <div className="search-box">

        <span>⌕</span>

        <input
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Search by name, patient ID or phone..."
        />

      </div>

      <div className="panel patient-table-panel">

        <div className="table patient-table">

          <div className="patient-table-head">
            <span>Patient</span>
            <span>Patient ID</span>
            <span>Age / Gender</span>
            <span>Blood</span>
            <span>Condition</span>
            <span>Status</span>
            <span>Action</span>
          </div>

          {filteredPatients.map(
            (patient) => (
              <div
                className="patient-table-row"
                key={patient.id}
              >

                <span className="patient-name">

                  <div className="small-avatar">
                    {patient.name.charAt(0)}
                  </div>

                  {patient.name}

                </span>

                <span>{patient.id}</span>

                <span>
                  {patient.age} /{" "}
                  {patient.gender}
                </span>

                <span>{patient.blood}</span>

                <span>
                  {patient.condition}
                </span>

                <span>
                  <b
                    className={`status ${
                      patient.status ===
                      "Active"
                        ? "active-status"
                        : "follow-status"
                    }`}
                  >
                    {patient.status}
                  </b>
                </span>

                <span>
                  <button
                    className="view-button"
                    onClick={() =>
                      setSelectedPatient(
                        patient
                      )
                    }
                  >
                    View
                  </button>
                </span>

              </div>
            )
          )}

          {filteredPatients.length === 0 && (
            <div className="empty-state">
              <div>🔍</div>
              <h3>No patients found</h3>
              <p>
                Try a different name, ID or phone
                number.
              </p>
            </div>
          )}

        </div>

      </div>
    </>
  );
}

/* =========================================================
   PATIENT PROFILE
========================================================= */

function PatientProfile({
  patient,
  medicalHistory,
  onBack,
}) {
  const patientHistory =
    medicalHistory
      .filter(
        (record) =>
          record.patient === patient.name
      )
      .sort(
        (a, b) =>
          new Date(b.date) -
          new Date(a.date)
      );

  return (
    <div>

      <button
        className="back-button"
        onClick={onBack}
      >
        ← Back to Patients
      </button>

      {/* PROFILE HEADER */}

      <div className="profile-header">

        <div className="profile-large-avatar">
          {patient.name.charAt(0)}
        </div>

        <div className="profile-title">

          <h2>{patient.name}</h2>

          <p>
            {patient.id} •{" "}
            {patient.gender} •{" "}
            {patient.age} years
          </p>

        </div>

        <span
          className={`status ${
            patient.status === "Active"
              ? "active-status"
              : "follow-status"
          }`}
        >
          {patient.status}
        </span>

      </div>

      {/* INFORMATION + SUMMARY */}

      <div className="content-grid">

        <div className="panel">

          <div className="panel-title">
            Patient Information
          </div>

          <div className="info-grid">

            <div>
              <small>Phone</small>
              <strong>
                {patient.phone}
              </strong>
            </div>

            <div>
              <small>Blood Group</small>
              <strong>
                {patient.blood}
              </strong>
            </div>

            <div>
              <small>Condition</small>
              <strong>
                {patient.condition}
              </strong>
            </div>

            <div>
              <small>Patient ID</small>
              <strong>
                {patient.id}
              </strong>
            </div>

          </div>

        </div>

        <div className="panel">

          <div className="panel-title">
            Medical Summary
          </div>

          <div className="info-grid">

            <div>
              <small>Last Visit</small>

              <strong>
                {patientHistory.length > 0
                  ? formatDate(
                      patientHistory[0]
                        .date
                    )
                  : "No visits"}
              </strong>
            </div>

            <div>
              <small>Medical Records</small>

              <strong>
                {patientHistory.length}
              </strong>
            </div>

            <div>
              <small>Allergies</small>

              <strong>
                None recorded
              </strong>
            </div>

            <div>
              <small>Blood Group</small>

              <strong>
                {patient.blood}
              </strong>
            </div>

          </div>

        </div>

      </div>

      {/* MEDICAL HISTORY */}

      <div className="panel history-panel">

        <div className="panel-header">

          <div>
            <h2>Medical History</h2>

            <p>
              Clinical records for{" "}
              {patient.name}
            </p>
          </div>

          <strong>
            {patientHistory.length}{" "}
            record
            {patientHistory.length !== 1
              ? "s"
              : ""}
          </strong>

        </div>

        {patientHistory.length === 0 ? (
          <div className="empty-state">

            <div>📋</div>

            <h3>
              No medical history
            </h3>

            <p>
              No consultation, prescription
              or lab records have been
              added for this patient yet.
            </p>

          </div>
        ) : (
          <div className="history-list">

            {patientHistory.map(
              (record) => (
                <div
                  className="history-item"
                  key={record.id}
                >

                  <div className="history-date">
                    {formatShortDate(
                      record.date
                    )}
                  </div>

                  <div className="history-content">

                    <strong>
                      {record.type}
                    </strong>

                    <p>
                      {record.details}
                    </p>

                    <small>
                      Recorded by{" "}
                      {record.doctor}
                    </small>

                  </div>

                </div>
              )
            )}

          </div>
        )}

      </div>

    </div>
  );
}

/* =========================================================
   APPOINTMENTS
========================================================= */

function AppointmentsPage({
  appointments,
  appointmentForm,
  setAppointmentForm,
  patients,
  createAppointment,
}) {
  return (
    <>
      <div className="page-toolbar">

        <div>
          <h2>
            Appointment Management
          </h2>

          <p>
            Schedule and manage patient
            appointments
          </p>
        </div>

      </div>

      <div className="content-grid">

        {/* CREATE APPOINTMENT */}

        <div className="panel">

          <div className="panel-title">
            Schedule Appointment
          </div>

          <form
            onSubmit={createAppointment}
          >

            <div className="form-stack">

              <label>
                Patient *

                <SearchableDropdown
                  options={patients.map((patient) => ({
                    value: patient.name,
                    label: patient.name,
                    subLabel: `${patient.id} • ${patient.phone}`,
                  }))}
                  value={appointmentForm.patient}
                  onChange={(patient) =>
                    setAppointmentForm({
                      ...appointmentForm,
                      patient,
                    })
                  }
                  placeholder="Select patient"
                  searchPlaceholder="Search patient..."
                />

              </label>

              <label>
                Date

                <input
                  type="date"
                  value={
                    appointmentForm.date
                  }
                  onChange={(e) =>
                    setAppointmentForm({
                      ...appointmentForm,
                      date:
                        e.target.value,
                    })
                  }
                />

              </label>

              <label>
                Time

                <input
                  type="time"
                  value={
                    appointmentForm.time
                  }
                  onChange={(e) =>
                    setAppointmentForm({
                      ...appointmentForm,
                      time:
                        e.target.value,
                    })
                  }
                />

              </label>

              <label>
                Doctor

                <SearchableDropdown
                  options={[
                    {
                      value: "Dr. Rajesh",
                      label: "Dr. Rajesh",
                      subLabel: "General Medicine",
                    },
                    {
                      value: "Dr. Mehta",
                      label: "Dr. Mehta",
                      subLabel: "Pulmonology",
                    },
                    {
                      value: "Dr. Priya",
                      label: "Dr. Priya",
                      subLabel: "General Medicine",
                    },
                  ]}
                  value={appointmentForm.doctor}
                  onChange={(doctor) =>
                    setAppointmentForm({
                      ...appointmentForm,
                      doctor,
                    })
                  }
                  placeholder="Select doctor"
                  searchPlaceholder="Search doctor..."
                />
              </label>

              <label>
                Appointment Type

                <SearchableDropdown
                  options={[
                    { value: "General Checkup", label: "General Checkup" },
                    { value: "Follow-up", label: "Follow-up" },
                    { value: "Consultation", label: "Consultation" },
                    { value: "Specialist Visit", label: "Specialist Visit" },
                  ]}
                  value={appointmentForm.type}
                  onChange={(type) =>
                    setAppointmentForm({
                      ...appointmentForm,
                      type,
                    })
                  }
                  placeholder="Select appointment type"
                  searchPlaceholder="Search appointment type..."
                />

              </label>

              <button
                className="primary-button"
                type="submit"
              >
                Schedule Appointment
              </button>

            </div>

          </form>

        </div>

        {/* APPOINTMENT LIST */}

        <div className="panel">

          <div className="panel-header">

            <div>
              <h2>Appointments</h2>

              <p>
                Scheduled patient visits
              </p>
            </div>

          </div>

          <div className="appointments">

            {appointments
              .slice()
              .sort(
                (a, b) =>
                  new Date(
                    `${a.date} ${a.time}`
                  ) -
                  new Date(
                    `${b.date} ${b.time}`
                  )
              )
              .map((appointment) => (
                <div
                  className="appointment"
                  key={appointment.id}
                >

                  <div className="appointment-time">
                    <strong>
                      {appointment.time}
                    </strong>

                    <small>
                      {formatDate(
                        appointment.date
                      )}
                    </small>
                  </div>

                  <div className="appointment-info">

                    <strong>
                      {appointment.patient}
                    </strong>

                    <span>
                      {appointment.type}
                    </span>

                    <small>
                      {appointment.doctor}
                    </small>

                  </div>

                  <b
                    className={`status ${
                      appointment.status ===
                      "Confirmed"
                        ? "active-status"
                        : "follow-status"
                    }`}
                  >
                    {appointment.status}
                  </b>

                </div>
              ))}

          </div>

        </div>

      </div>
    </>
  );
}

/* =========================================================
   CONSULTATION PAGE
========================================================= */

function ConsultationPage({
  consultation,
  setConsultation,
  patients,
  saveConsultation,
}) {
  return (
    <>
      <div className="page-toolbar">

        <div>
          <h2>
            Clinical Consultation
          </h2>

          <p>
            Record patient consultation
            details
          </p>
        </div>

      </div>

      <div className="panel">

        <form
          onSubmit={saveConsultation}
        >

          <div className="form-grid">

            <label>
              Patient *

              <SearchableDropdown
                options={patients.map((patient) => ({
                  value: patient.name,
                  label: patient.name,
                  subLabel: `${patient.id} • ${patient.phone}`,
                }))}
                value={consultation.patient}
                onChange={(patient) =>
                  setConsultation({
                    ...consultation,
                    patient,
                  })
                }
                placeholder="Select patient"
                searchPlaceholder="Search patient..."
              />

            </label>

            <label>
              Symptoms

              <input
                value={
                  consultation.symptoms
                }
                onChange={(e) =>
                  setConsultation({
                    ...consultation,
                    symptoms:
                      e.target.value,
                  })
                }
                placeholder="Enter symptoms"
              />

            </label>

            <label>
              Blood Pressure

              <input
                value={consultation.bp}
                onChange={(e) =>
                  setConsultation({
                    ...consultation,
                    bp: e.target.value,
                  })
                }
                placeholder="120/80"
              />

            </label>

            <label>
              Pulse

              <input
                value={
                  consultation.pulse
                }
                onChange={(e) =>
                  setConsultation({
                    ...consultation,
                    pulse:
                      e.target.value,
                  })
                }
                placeholder="72 bpm"
              />

            </label>

            <label>
              Temperature

              <input
                value={
                  consultation.temperature
                }
                onChange={(e) =>
                  setConsultation({
                    ...consultation,
                    temperature:
                      e.target.value,
                  })
                }
                placeholder="98.6 °F"
              />

            </label>

            <label>
              Diagnosis

              <input
                value={
                  consultation.diagnosis
                }
                onChange={(e) =>
                  setConsultation({
                    ...consultation,
                    diagnosis:
                      e.target.value,
                  })
                }
                placeholder="Enter diagnosis"
              />

            </label>

            <label className="full">
              Clinical Notes

              <textarea
                value={
                  consultation.notes
                }
                onChange={(e) =>
                  setConsultation({
                    ...consultation,
                    notes:
                      e.target.value,
                  })
                }
                placeholder="Enter consultation notes..."
                rows="5"
              />

            </label>

          </div>

          <div className="modal-actions">

            <button
              className="primary-button"
              type="submit"
            >
              Save Consultation
            </button>

          </div>

        </form>

      </div>
    </>
  );
}

/* =========================================================
   PRESCRIPTION PAGE
========================================================= */

function PrescriptionPage({
  prescription,
  setPrescription,
  patients,
  savePrescription,
}) {
  return (
    <>
      <div className="page-toolbar">

        <div>
          <h2>
            Prescriptions
          </h2>

          <p>
            Create and record patient
            prescriptions
          </p>
        </div>

      </div>

      <div className="panel">

        <form
          onSubmit={savePrescription}
        >

          <div className="form-grid">

            <label>
              Patient *

              <SearchableDropdown
                options={patients.map((patient) => ({
                  value: patient.name,
                  label: patient.name,
                  subLabel: `${patient.id} • ${patient.phone}`,
                }))}
                value={prescription.patient}
                onChange={(patient) =>
                  setPrescription({
                    ...prescription,
                    patient,
                  })
                }
                placeholder="Select patient"
                searchPlaceholder="Search patient..."
              />

            </label>

            <label>
              Medicine *

              <input
                value={
                  prescription.medicine
                }
                onChange={(e) =>
                  setPrescription({
                    ...prescription,
                    medicine:
                      e.target.value,
                  })
                }
                placeholder="Medicine name"
              />

            </label>

            <label>
              Dosage *

              <input
                value={
                  prescription.dosage
                }
                onChange={(e) =>
                  setPrescription({
                    ...prescription,
                    dosage:
                      e.target.value,
                  })
                }
                placeholder="e.g. 500 mg"
              />

            </label>

            <label>
              Frequency

              <SearchableDropdown
                options={[
                  { value: "Once daily", label: "Once daily" },
                  { value: "Twice daily", label: "Twice daily" },
                  { value: "Three times daily", label: "Three times daily" },
                  { value: "Before food", label: "Before food" },
                  { value: "After food", label: "After food" },
                  { value: "As needed", label: "As needed" },
                ]}
                value={prescription.frequency}
                onChange={(frequency) =>
                  setPrescription({
                    ...prescription,
                    frequency,
                  })
                }
                placeholder="Select frequency"
                searchPlaceholder="Search frequency..."
              />

            </label>

            <label>
              Duration

              <input
                value={
                  prescription.duration
                }
                onChange={(e) =>
                  setPrescription({
                    ...prescription,
                    duration:
                      e.target.value,
                  })
                }
                placeholder="e.g. 5 days"
              />

            </label>

          </div>

          <div className="modal-actions">

            <button
              className="primary-button"
              type="submit"
            >
              Create Prescription
            </button>

          </div>

        </form>

      </div>
    </>
  );
}

/* =========================================================
   LAB PAGE
========================================================= */

function LabPage({
  labReport,
  setLabReport,
  patients,
  saveLabReport,
}) {
  return (
    <>
      <div className="page-toolbar">

        <div>
          <h2>
            Laboratory Reports
          </h2>

          <p>
            Add and manage patient
            laboratory reports
          </p>
        </div>

      </div>

      <div className="panel">

        <form
          onSubmit={saveLabReport}
        >

          <div className="form-grid">

            <label>
              Patient *

              <SearchableDropdown
              options={patients.map((patient) => ({
                value: patient.name,
                label: patient.name,
                subLabel: `${patient.id} • ${patient.phone}`,
              }))}
              value={labReport.patient}
              onChange={(patient) =>
                setLabReport({
                  ...labReport,
                  patient,
                })
              }
              placeholder="Select patient"
              searchPlaceholder="Search patient..."
            />

            </label>

            <label>
              Test Name *

              <input
                value={labReport.test}
                onChange={(e) =>
                  setLabReport({
                    ...labReport,
                    test: e.target.value,
                  })
                }
                placeholder="e.g. CBC"
              />

            </label>

            <label>
              Result

              <input
                value={
                  labReport.result
                }
                onChange={(e) =>
                  setLabReport({
                    ...labReport,
                    result:
                      e.target.value,
                  })
                }
                placeholder="Enter test result"
              />

            </label>

            <label>
              Status

              <SearchableDropdown
              options={[
                { value: "Pending", label: "Pending" },
                { value: "Completed", label: "Completed" },
                { value: "Reviewed", label: "Reviewed" },
              ]}
              value={labReport.status}
              onChange={(status) =>
                setLabReport({
                  ...labReport,
                  status,
                })
              }
              placeholder="Select status"
              searchPlaceholder="Search status..."
            />

            </label>

          </div>

          <div className="modal-actions">

            <button
              className="primary-button"
              type="submit"
            >
              Add Lab Report
            </button>

          </div>

        </form>

      </div>
    </>
  );
}

/* =========================================================
   SETTINGS
========================================================= */

function SettingsPage() {
  return (
    <>
      <div className="page-toolbar">

        <div>
          <h2>Settings</h2>

          <p>
            MediRecord system settings
          </p>
        </div>

      </div>

      <div className="panel">

        <div className="panel-title">
          System Information
        </div>

        <div className="info-grid">

          <div>
            <small>Application</small>
            <strong>
              MediRecord EMR
            </strong>
          </div>

          <div>
            <small>Version</small>
            <strong>
              1.0.0
            </strong>
          </div>

          <div>
            <small>Platform</small>
            <strong>
              Web Application
            </strong>
          </div>

          <div>
            <small>Storage</small>
            <strong>
              Browser Local Storage
            </strong>
          </div>

        </div>

        <div className="settings-note">

          <h3>
            Prototype Information
          </h3>

          <p>
            This MediRecord application is a
            demonstration EMR prototype.
            Patient information shown in this
            application is fictional demo data.
          </p>

        </div>

      </div>
    </>
  );
}

export default App;