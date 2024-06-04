import React, { useEffect, useState } from "react";
import { Admin, DataProvider, Resource } from "react-admin";
import buildGraphQLProvider from "./data-provider/graphqlDataProvider";
import { theme } from "./theme/theme";
import Login from "./Login";
import "./App.scss";
import Dashboard from "./pages/Dashboard";
import { PeriodList } from "./period/PeriodList";
import { PeriodCreate } from "./period/PeriodCreate";
import { PeriodEdit } from "./period/PeriodEdit";
import { PeriodShow } from "./period/PeriodShow";
import { TeacherList } from "./teacher/TeacherList";
import { TeacherCreate } from "./teacher/TeacherCreate";
import { TeacherEdit } from "./teacher/TeacherEdit";
import { TeacherShow } from "./teacher/TeacherShow";
import { ScheduleList } from "./schedule/ScheduleList";
import { ScheduleCreate } from "./schedule/ScheduleCreate";
import { ScheduleEdit } from "./schedule/ScheduleEdit";
import { ScheduleShow } from "./schedule/ScheduleShow";
import { TimetableList } from "./timetable/TimetableList";
import { TimetableCreate } from "./timetable/TimetableCreate";
import { TimetableEdit } from "./timetable/TimetableEdit";
import { TimetableShow } from "./timetable/TimetableShow";
import { jwtAuthProvider } from "./auth-provider/ra-auth-jwt";

const App = (): React.ReactElement => {
  const [dataProvider, setDataProvider] = useState<DataProvider | null>(null);
  useEffect(() => {
    buildGraphQLProvider
      .then((provider: any) => {
        setDataProvider(() => provider);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, []);
  if (!dataProvider) {
    return <div>Loading</div>;
  }
  return (
    <div className="App">
      <Admin
        title={"TimetableService"}
        dataProvider={dataProvider}
        authProvider={jwtAuthProvider}
        theme={theme}
        dashboard={Dashboard}
        loginPage={Login}
      >
        <Resource
          name="Period"
          list={PeriodList}
          edit={PeriodEdit}
          create={PeriodCreate}
          show={PeriodShow}
        />
        <Resource
          name="Teacher"
          list={TeacherList}
          edit={TeacherEdit}
          create={TeacherCreate}
          show={TeacherShow}
        />
        <Resource
          name="Schedule"
          list={ScheduleList}
          edit={ScheduleEdit}
          create={ScheduleCreate}
          show={ScheduleShow}
        />
        <Resource
          name="Timetable"
          list={TimetableList}
          edit={TimetableEdit}
          create={TimetableCreate}
          show={TimetableShow}
        />
      </Admin>
    </div>
  );
};

export default App;
