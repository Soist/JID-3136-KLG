import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage/Home";
import AboutPage from "./components/AboutPage/About";
import Navbar from "./components/Navbar/Navbar";
import RedLightGreenLightPage from "./components/RedLightGreenLightPage/RedLightGreenLightPage";
import StudyOptionsPage from "./components/StudyOptionsPage/StudyOptionsPage";
import VocabOptionsPage from "./components/StudyOptionsPage/VocabOptionsPage";
import GrammarOptionsPage from "./components/StudyOptionsPage/GrammarOptionsPage";
import ListenOptionsPage from "./components/StudyOptionsPage/ListenOptionsPage";
import TugOfWarPage from "./components/TugOfWarPage/TugOfWarPage";
import SugarHoneycombsPage from "./components/SugarHoneycombsPage/SugarHoneycombsPage";
import UnitsListPage from "./components/UnitsListPage/UnitsListPage";
import FlashcardStudyPage from "./components/FlashcardPage/FlashcardStudyPage";
import ProgressPage from "./components/ProgressPage/Progress";
import ChatboxPage from "./components/ChatboxPage/Chatbox";
import LoginPage from "./components/LoginPage/Login";
import RegisterPage from "./components/RegisterPage/Register";
import LogoutPage from "./components/LogoutPage/Logout";
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {
  HOME_PATH,
  ABOUT_PATH,
  RED_LIGHT_GREEN_LIGHT_PATH,
  STUDY_OPTIONS_PATH,
  VOCAB_OPTIONS_PATH,
  GRAMMAR_OPTIONS_PATH,
  LISTEN_OPTIONS_PATH,
  TUG_OF_WAR_PATH,
  SUGAR_HONEYCOMBS,
  UNITS_LIST_PATH,
  FLASHCARD_STUDY_PATH,
  PROGRESS_PATH,
  CHATBOX_PATH,
  LOGIN_PATH,
  LOGOUT_PATH,
  REGISTER_PATH,
} from "./constants";
import "./index.css";

const root = createRoot(document.getElementById("root"));
const theStack = createNativeStackNavigator();
root.render(
  <Router>
    <Navbar></Navbar>
    <Routes>
      <Route path={HOME_PATH} element={<HomePage />} />
      <Route path={ABOUT_PATH} element={<AboutPage />} />
      <Route path={UNITS_LIST_PATH} element={<UnitsListPage />} />
      <Route path={STUDY_OPTIONS_PATH} element={<StudyOptionsPage />} />
      <Route path={VOCAB_OPTIONS_PATH} element={<VocabOptionsPage />} />
      <Route path={GRAMMAR_OPTIONS_PATH} element={<GrammarOptionsPage />} />
      <Route path={LISTEN_OPTIONS_PATH} element={<ListenOptionsPage />} />
      <Route
        path={RED_LIGHT_GREEN_LIGHT_PATH}
        element={<RedLightGreenLightPage />}
      />
      <Route path={TUG_OF_WAR_PATH} element={<TugOfWarPage />} />
      <Route path={SUGAR_HONEYCOMBS} element={<SugarHoneycombsPage />} />
      <Route path={FLASHCARD_STUDY_PATH} element={<FlashcardStudyPage />} />
      <Route path={PROGRESS_PATH} element={<ProgressPage />} />
      <Route path={CHATBOX_PATH} element={<ChatboxPage />} />
      <Route path={LOGIN_PATH} element={<LoginPage />} />
      <Route path={LOGOUT_PATH} element={<LogoutPage />} />
      <Route path={REGISTER_PATH} element={<RegisterPage />} />
    </Routes>
  </Router>
);
