
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./StudentSettings.css";

function StudentSettings() {

    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState("appearance");

    const [theme, setTheme] = useState(
        () => localStorage.getItem("zentrion-theme") || "light"
    );

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

        const applyTheme = () => {
            const effectiveTheme =
                theme === "system"
                    ? mediaQuery.matches
                        ? "dark"
                        : "light"
                    : theme;

            document.documentElement.setAttribute("data-theme", effectiveTheme);
            document.body.setAttribute("data-theme", effectiveTheme);
        };

        applyTheme();

        if (theme === "system") {
            mediaQuery.addEventListener("change", applyTheme);
        }

        localStorage.setItem("zentrion-theme", theme);

        return () => {
            mediaQuery.removeEventListener("change", applyTheme);
        };
    }, [theme]);

    const [notificationSettings, setNotificationSettings] = useState(() => {
        const saved = localStorage.getItem("zentrion-notifications");

        return saved
            ? JSON.parse(saved)
            : {
                practice: true,
                learning: true,
                projects: true,
            };
    });

    const toggleNotification = (key) => {
        setNotificationSettings((previous) => {
            const updated = {
                ...previous,
                [key]: !previous[key],
            };

            localStorage.setItem(
                "zentrion-notifications",
                JSON.stringify(updated)
            );

            return updated;
        });
    };
    const [learningPreferences, setLearningPreferences] = useState(() => {
        const saved = localStorage.getItem("zentrion-learning-preferences");

        return saved
            ? JSON.parse(saved)
            : {
                dailyGoal: "2",
                language: "Java",
                difficulty: "Beginner",
            };
    });

    const updateLearningPreference = (key, value) => {
        setLearningPreferences((previous) => {
            const updated = {
                ...previous,
                [key]: value,
            };

            localStorage.setItem(
                "zentrion-learning-preferences",
                JSON.stringify(updated)
            );

            return updated;
        });
    };
    const [profile, setProfile] = useState(() => {
        const saved = localStorage.getItem("zentrion-student-profile");

        return saved
            ? JSON.parse(saved)
            : {
                fullName: "",
                email: "",
                department: "",
                semester: "",
            };
    });

    const [profileMessage, setProfileMessage] = useState("");

    const updateProfile = (key, value) => {
        setProfile((previous) => ({
            ...previous,
            [key]: value,
        }));
    };

    const saveProfile = (e) => {
        e.preventDefault();

        localStorage.setItem(
            "zentrion-student-profile",
            JSON.stringify(profile)
        );

        setProfileMessage("Profile details saved successfully.");
    };
    const settingsTabs = [
        { id: "appearance", label: "Appearance", icon: "🎨" },
        { id: "notifications", label: "Notifications", icon: "🔔" },
        { id: "learning", label: "Learning Preferences", icon: "🎓" },
        { id: "account", label: "Account & Profile", icon: "👤" },
    ];

    const descriptions = {
        appearance: "Customize how Zentrion looks and feels.",
        notifications: "Manage the notifications you receive.",
        learning: "Personalize your learning goals and preferences.",
        account: "Manage your student profile and account details.",
    };

    const activeTabData = settingsTabs.find(
        (tab) => tab.id === activeTab
    );

    return (
        <div className="student-settings">

            {/* PAGE HEADER */}
            <header className="settings-page-header">
                <button
                    type="button"
                    className="settings-action-btn"
                    onClick={() => navigate("/student-dashboard")}
                >
                    ← Back to Dashboard
                </button>

                <div style={{ marginTop: "25px" }}>
                    <p>PERSONALIZE YOUR EXPERIENCE</p>
                    <h1>Settings</h1>
                    <span>
                        Manage your learning experience and preferences.
                    </span>
                </div>
            </header>

            {/* SETTINGS LAYOUT */}
            <div className="settings-layout">

                {/* SIDEBAR */}
                <aside className="settings-sidebar">
                    {settingsTabs.map((tab) => (
                        <button
                            key={tab.id}
                            type="button"
                            className={`settings-nav-item ${activeTab === tab.id ? "active" : ""
                                }`}
                            onClick={() => setActiveTab(tab.id)}
                            aria-current={
                                activeTab === tab.id ? "page" : undefined
                            }
                        >
                            <span>{tab.icon}</span>
                            {tab.label}
                        </button>
                    ))}
                </aside>

                {/* SETTINGS CONTENT */}
                <section className="settings-content">
                    <div className="settings-card">

                        <div className="settings-card-header">
                            <h2>{activeTabData?.label}</h2>
                            <p>{descriptions[activeTab]}</p>
                        </div>

                        {/* APPEARANCE */}
                        {activeTab === "appearance" && (
                            <>
                                <div className="setting-row">
                                    <div className="setting-info">
                                        <strong>Light theme</strong>
                                        <p>
                                            Use a bright and clean interface.
                                        </p>
                                    </div>

                                    <button
                                        type="button"
                                        className={`settings-action-btn ${theme === "light" ? "selected" : ""
                                            }`}
                                        onClick={() => setTheme("light")}
                                        aria-pressed={theme === "light"}
                                    >
                                        ☀ Light {theme === "light" ? "✓" : ""}
                                    </button>
                                </div>

                                <div className="setting-row">
                                    <div className="setting-info">
                                        <strong>Dark theme</strong>
                                        <p>
                                            Use a darker interface for comfortable viewing.
                                        </p>
                                    </div>

                                    <button
                                        type="button"
                                        className={`settings-action-btn ${theme === "dark" ? "selected" : ""
                                            }`}
                                        onClick={() => setTheme("dark")}
                                        aria-pressed={theme === "dark"}
                                    >
                                        ☾ Dark {theme === "dark" ? "✓" : ""}
                                    </button>
                                </div>
                                <div className="setting-row">
                                    <div className="setting-info">
                                        <strong>System default</strong>
                                        <p>
                                            Automatically follow your device's appearance setting.
                                        </p>
                                    </div>

                                    <button
                                        type="button"
                                        className={`settings-action-btn ${theme === "system" ? "selected" : ""
                                            }`}
                                        onClick={() => setTheme("system")}
                                        aria-pressed={theme === "system"}
                                    >
                                        💻 System {theme === "system" ? "✓" : ""}
                                    </button>
                                </div>
                            </>
                        )}

                        {/* NOTIFICATIONS */}
                        {activeTab === "notifications" && (
                            <>
                                <div className="setting-row">
                                    <div className="setting-info">
                                        <strong>Practice reminders</strong>
                                        <p>
                                            Get reminders about pending coding problems and practice.
                                        </p>
                                    </div>

                                    <input
                                        type="checkbox"
                                        checked={notificationSettings.practice}
                                        onChange={() => toggleNotification("practice")}
                                        aria-label="Practice reminders"
                                    />
                                </div>

                                <div className="setting-row">
                                    <div className="setting-info">
                                        <strong>Learning and assessment updates</strong>
                                        <p>
                                            Receive updates about lessons, quizzes and assessments.
                                        </p>
                                    </div>

                                    <input
                                        type="checkbox"
                                        checked={notificationSettings.learning}
                                        onChange={() => toggleNotification("learning")}
                                        aria-label="Learning and assessment updates"
                                    />
                                </div>

                                <div className="setting-row">
                                    <div className="setting-info">
                                        <strong>Projects and achievements</strong>
                                        <p>
                                            Stay updated about project progress and achievements.
                                        </p>
                                    </div>

                                    <input
                                        type="checkbox"
                                        checked={notificationSettings.projects}
                                        onChange={() => toggleNotification("projects")}
                                        aria-label="Projects and achievements"
                                    />
                                </div>
                            </>
                        )}

                        {/* LEARNING PREFERENCES */}
                        {activeTab === "learning" && (
                            <>
                                <div className="setting-row">
                                    <div className="setting-info">
                                        <strong>Daily learning goal</strong>
                                        <p>Set how much time you want to learn each day.</p>
                                    </div>

                                    <select
                                        className="settings-select"
                                        value={learningPreferences.dailyGoal}
                                        onChange={(e) =>
                                            updateLearningPreference("dailyGoal", e.target.value)
                                        }
                                    >
                                        <option value="1">1 hour</option>
                                        <option value="2">2 hours</option>
                                        <option value="3">3 hours</option>
                                        <option value="4">4 hours</option>
                                    </select>
                                </div>

                                <div className="setting-row">
                                    <div className="setting-info">
                                        <strong>Preferred programming language</strong>
                                        <p>Choose the language you want to focus on.</p>
                                    </div>

                                    <select
                                        className="settings-select"
                                        value={learningPreferences.language}
                                        onChange={(e) =>
                                            updateLearningPreference("language", e.target.value)
                                        }
                                    >
                                        <option value="Java">Java</option>
                                        <option value="Python">Python</option>
                                        <option value="C">C</option>
                                        <option value="C++">C++</option>
                                        <option value="JavaScript">JavaScript</option>
                                    </select>
                                </div>

                                <div className="setting-row">
                                    <div className="setting-info">
                                        <strong>Difficulty level</strong>
                                        <p>Choose your preferred learning level.</p>
                                    </div>

                                    <select
                                        className="settings-select"
                                        value={learningPreferences.difficulty}
                                        onChange={(e) =>
                                            updateLearningPreference("difficulty", e.target.value)
                                        }
                                    >
                                        <option value="Beginner">Beginner</option>
                                        <option value="Intermediate">Intermediate</option>
                                        <option value="Advanced">Advanced</option>
                                    </select>
                                </div>
                            </>
                        )}

                        {/* ACCOUNT & PROFILE */}
                        {activeTab === "account" && (
                            <form onSubmit={saveProfile}>
                                <div className="setting-row">
                                    <div className="setting-info">
                                        <strong>Full name</strong>
                                        <p>Your student name.</p>
                                    </div>

                                    <input
                                        className="settings-select"
                                        type="text"
                                        value={profile.fullName}
                                        onChange={(e) =>
                                            updateProfile("fullName", e.target.value)
                                        }
                                        placeholder="Enter your name"
                                        required
                                    />
                                </div>

                                <div className="setting-row">
                                    <div className="setting-info">
                                        <strong>Email address</strong>
                                        <p>Your registered email address.</p>
                                    </div>

                                    <input
                                        className="settings-select"
                                        type="email"
                                        value={profile.email}
                                        onChange={(e) =>
                                            updateProfile("email", e.target.value)
                                        }
                                        placeholder="Enter your email"
                                        required
                                    />
                                </div>

                                <div className="setting-row">
                                    <div className="setting-info">
                                        <strong>Department</strong>
                                        <p>Your academic department.</p>
                                    </div>

                                    <input
                                        className="settings-select"
                                        type="text"
                                        value={profile.department}
                                        onChange={(e) =>
                                            updateProfile("department", e.target.value)
                                        }
                                        placeholder="Enter your department"
                                    />
                                </div>

                                <div className="setting-row">
                                    <div className="setting-info">
                                        <strong>Semester</strong>
                                        <p>Your current semester.</p>
                                    </div>

                                    <select
                                        className="settings-select"
                                        value={profile.semester}
                                        onChange={(e) =>
                                            updateProfile("semester", e.target.value)
                                        }
                                    >
                                        <option value="">Select semester</option>
                                        {[1, 2, 3, 4, 5, 6, 7, 8].map((semester) => (
                                            <option key={semester} value={semester}>
                                                Semester {semester}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="setting-row">
                                    <div className="setting-info">
                                        <strong>Save changes</strong>
                                        <p>Save your updated profile information.</p>
                                    </div>

                                    <button
                                        type="submit"
                                        className="settings-save-btn"
                                    >
                                        Save Profile
                                    </button>
                                </div>

                                {profileMessage && (
                                    <p role="status">{profileMessage}</p>
                                )}
                            </form>
                        )}

                    </div>
                </section>
            </div>
        </div>
    );
}

export default StudentSettings;
