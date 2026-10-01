import streamlit as st
import requests
import pandas as pd


# -----------------------------
# Page Configuration
# -----------------------------

st.set_page_config(
    page_title="Smart Hydration Tracker",
    page_icon="💧",
    layout="wide"
)


# -----------------------------
# API Configuration
# -----------------------------

API_URL = "http://127.0.0.1:8000"


# -----------------------------
# Header
# -----------------------------

st.title("💧 Smart Hydration Tracker")

st.write(
    "AI-powered daily water intake monitoring and personalized hydration guidance."
)

st.divider()


# -----------------------------
# User Input Section
# -----------------------------

st.subheader("Log Your Water Intake")

col1, col2 = st.columns(2)

with col1:
    user_id = st.text_input(
        "User ID",
        value="user_123"
    )

with col2:
    intake_ml = st.number_input(
        "Water Intake (ml)",
        min_value=0,
        step=100,
        value=2000
    )


# -----------------------------
# Log Intake Button
# -----------------------------

if st.button("Log Water Intake", type="primary"):

    if not user_id:
        st.warning("Please enter a User ID.")

    else:

        try:

            response = requests.post(
                f"{API_URL}/log-intake",
                json={
                    "user_id": user_id,
                    "intake_ml": intake_ml
                }
            )

            if response.status_code == 200:

                data = response.json()
                analysis = data["analysis"]

                st.success("Water intake logged successfully!")

                st.divider()

                # -----------------------------
                # AI Analysis
                # -----------------------------

                st.subheader("AI Hydration Analysis")

                col1, col2, col3 = st.columns(3)

                with col1:
                    st.metric(
                        "Water Intake",
                        f"{intake_ml} ml"
                    )

                with col2:
                    st.metric(
                        "Hydration Status",
                        analysis["hydration_status"]
                    )

                with col3:
                    st.metric(
                        "User",
                        user_id
                    )

                st.divider()

                # -----------------------------
                # Analysis Details
                # -----------------------------

                st.markdown("### Summary")

                st.info(
                    analysis["summary"]
                )

                st.markdown("### Recommendation")

                st.write(
                    analysis["recommendation"]
                )

                st.markdown("### Next Action")

                st.success(
                    analysis["next_action"]
                )

            else:

                st.error(
                    f"API Error: {response.status_code}"
                )

        except requests.exceptions.ConnectionError:

            st.error(
                "Could not connect to the FastAPI server. "
                "Please make sure the backend is running."
            )


# -----------------------------
# Water Intake History
# -----------------------------

st.divider()

st.subheader("Water Intake History")

history_user_id = st.text_input(
    "Enter User ID to view history",
    value="user_123",
    key="history_user"
)


if st.button("View History"):

    try:

        response = requests.get(
            f"{API_URL}/history/{history_user_id}"
        )

        if response.status_code == 200:

            data = response.json()

            history = data["history"]

            if history:

                df = pd.DataFrame(
                    history,
                    columns=["Water Intake (ml)", "Date"]
                )

                df["Date"] = pd.to_datetime(df["Date"])

                st.dataframe(
                    df,
                    use_container_width=True
                )

                st.markdown("### Intake Trend")

                chart_data = df.set_index("Date")

                st.line_chart(
                    chart_data["Water Intake (ml)"]
                )

            else:

                st.info(
                    "No water intake history found for this user."
                )

        else:

            st.error(
                f"API Error: {response.status_code}"
            )

    except requests.exceptions.ConnectionError:

        st.error(
            "Could not connect to the FastAPI server. "
            "Please make sure the backend is running."
        )