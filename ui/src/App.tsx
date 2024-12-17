import { lazy, Suspense, useEffect } from "react";
import { Navigate, Route, HashRouter as Router, Routes } from "react-router-dom";

import "./App.scss";

import { Editor as IncidentEditor, List as IncidentList, New as IncidentNew } from "views/incident";
import {
  Editor as JournalEditor,
  List as JournalMessageList,
  New as JournalNew,
  Overview as JournalOverview,
} from "views/journal";

import { List as ImmediateMeasuresList } from "views/measures/immediateMeasures";
import { List as RequestList } from "views/measures/requests";
import { List as TaskList } from "views/measures/tasks";
import { List as ResourcesList } from "views/resource";

import { useTranslation } from "react-i18next";
import { ApolloProvider } from "@apollo/client";
import { Spinner } from "components";
import { UserProvider } from "utils";
import MessageSheet from "views/journal/MessageSheet";
import { Layout, LayoutMarginLess } from "views/Layout";
import { default as client } from "client";
import { Provider as FeatureFlagProvider } from "FeatureFlags";
import "./i18n";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import de from "dayjs/locale/de";
import fr from "dayjs/locale/fr";
import it from "dayjs/locale/it";
import en from "dayjs/locale/en";
const Map = lazy(() => import("views/map"));

function App() {
  const { i18n } = useTranslation();
  dayjs.extend(LocalizedFormat);

  useEffect(() => {
    i18n.changeLanguage();
    const locale = (lang: string) => {
      switch (lang) {
        case "de":
          return de;
        case "en":
          return en;
        case "fr":
          return fr;
        case "it":
          return it;
        default:
          return en;
      }
    };
    const lang = locale(i18n.language);
    dayjs.locale(lang.toString());
  }, [i18n.language]);

  return (
    <UserProvider>
      <ApolloProvider client={client}>
        <FeatureFlagProvider>
          <Router>
            <Routes>
              <Route path="/incident">
                <Route
                  path="list"
                  element={
                    <Layout>
                      <IncidentList />
                    </Layout>
                  }
                />
                <Route
                  path="new"
                  element={
                    <Layout>
                      <IncidentNew />
                    </Layout>
                  }
                />

                <Route path=":incidentId">
                  <Route
                    path="edit"
                    element={
                      <Layout>
                        <IncidentEditor />
                      </Layout>
                    }
                  />

                  <Route path="journal">
                    <Route
                      path="view"
                      element={
                        <Layout>
                          <JournalOverview />
                        </Layout>
                      }
                    />
                    <Route
                      path="new"
                      element={
                        <Layout>
                          <JournalNew />
                        </Layout>
                      }
                    />
                    <Route
                      path=":journalId/edit"
                      element={
                        <Layout>
                          <JournalEditor />
                        </Layout>
                      }
                    />
                    <Route
                      path=":journalId"
                      element={
                        <Layout>
                          <JournalMessageList showControls={false} autoScroll={true} />
                        </Layout>
                      }
                    />
                    <Route
                      path=":journalId/messages/:messageId"
                      element={
                        <Layout>
                          <MessageSheet />
                        </Layout>
                      }
                    />
                  </Route>

                  <Route
                    path="resources"
                    element={
                      <Layout>
                        <ResourcesList />
                      </Layout>
                    }
                  />
                  <Route
                    path="map"
                    element={
                      <LayoutMarginLess>
                        <Suspense fallback={<Spinner />}>
                          <Map />
                        </Suspense>
                      </LayoutMarginLess>
                    }
                  />
                  <Route
                    path="tasks"
                    element={
                      <Layout>
                        <TaskList />
                      </Layout>
                    }
                  />
                  <Route
                    path="requests"
                    element={
                      <Layout>
                        <RequestList />
                      </Layout>
                    }
                  />
                  <Route
                    path="soma"
                    element={
                      <Layout>
                        <ImmediateMeasuresList />
                      </Layout>
                    }
                  />
                </Route>
              </Route>
              <Route path="/" element={<Navigate to="/incident/list" />} />
            </Routes>
          </Router>
        </FeatureFlagProvider>
      </ApolloProvider>
    </UserProvider>
  );
}

export default App;
