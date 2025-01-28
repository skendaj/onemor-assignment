# OneMor Task

This project involves creating a **homepage for a fitness application** using **React Native**. The homepage will display a workout feed in a TikTok-style story format, with swipe navigation for routines and workouts. The app should function seamlessly on both **iOS** and **Android** platforms.

Data for the workout feed will be fetched from the API: `https://app.onemor.com/api/workout-feed`. Authentication will require a **Bearer Token**, and the API response will provide all necessary workout and routine data.

---

## Features

### API Integration

- **Endpoint**: `https://app.onemor.com/api/workout-feed`
- **Headers**:
  - `Accept: application/json`
  - `Authorization: Bearer <TOKEN>`
- **Data Handling**:
  - Infinite scrolling for loading more workouts.
  - Lazy loading of assets for optimized performance.

### UI/UX

- **Workout Stories**:

  - Swipe **Up/Down**: Navigate between workouts.
  - Swipe **Left/Right**: Switch routines within a workout.
  - Display workout details, including:
    - Workout Name
    - Trainer Profile Image
    - Workout Duration
    - Workout Difficulty
  - Display video and video thumbnail for routines.

- **Routine Details**:
  - Routine Name
  - Routine Video Source

### Performance

- Optimize video loading and transitions.
- Use shimmer effects for loading states.

---

## Rendering Data from the API Response

### 1. Workout Display

- **Workout Name**: `data.name`
- **Workout Duration**: `data.total_time` (in minutes and seconds)
- **Workout Difficulty**: `data.difficulty` (mapped as follows):
  - `0`: Beginner
  - `1`: Intermediate
  - `2`: Advanced
- **Trainer Profile Image**: `data.user.profile_photo_url`

### 2. Routine Navigation (Swipe Left/Right)

- Workouts consist of multiple routines, found in the `data.routines` array.
- For each routine:
  - **Routine Name**: `data.routines[n].name`
  - **Video Source**: `data.routines[n].video.playlist_url`

### 3. Example Swipe Workflow

- **Routine Swipe (Left/Right)**:
  - Updates the routine name and loads the corresponding video.
- **Workout Swipe (Up/Down)**:
  - Navigates to the next/previous workout, displaying its details and the first routine by default.

---

## Design Guide

Refer to the design guide on **Figma** for layout and styling:
[Onemor Homepage Test](https://www.figma.com/design/67ZQ5JSqwvHBg6z3jIoUvv/Onemor-Homepage-Test)

---

## Bonus Points

- Smooth transitions between routines and workouts.
- Shimmer effects during data loading.
- Well-optimized performance for video rendering.

---

## Final Notes

Best of luck! Show off your creativity and technical skills with this project. 💪
