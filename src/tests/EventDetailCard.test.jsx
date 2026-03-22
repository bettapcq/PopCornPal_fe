import { render, screen } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { describe, it, expect } from "vitest";
import { BrowserRouter } from "react-router-dom";
import EventDetailCard from "../components/eventCards/eventDetailCard/EventDetailCard";
import { Provider } from "react-redux";

const fakeStore = configureStore({
  reducer: () => ({}),
});

const fakeEventPropsToTry = {
  isCreator: false,
  isPastEvent: false,
  isFull: false,
  date: new Date(),

  currentEvent: {
    eventId: 16,
    title: "Anime Night: Spirits & Stories",
    description: "Test description",
    reservedSpots: 0,
    maxParticipants: 3,
    language: "EN",
    eventType: "ONLINE",
    address: "via mittica 15",

    location: {
      city: "Bologna",
      country: "Italy",
    },

    creator: {
      userId: 51,
      username: "BettaP",
      profileImg: "",
    },

    movie: {
      Title: "My Neighbor Totoro",
      Poster: "test.jpg",
      Year: "1988",
      Plot: "Test plot",
      Runtime: "120 min",
      Genre: "Animation",
    },

    userParticipationStatus: null,
  },

  participation: null,
};

describe("EventDetailCard", () => {
  it("renders event title", () => {
    // 1) Mount the component in virtual DOM
    render(
      <Provider store={fakeStore}>
        <BrowserRouter>
          <EventDetailCard {...fakeEventPropsToTry} />
        </BrowserRouter>
      </Provider>,
    );

    // 2) Identify the elements to test
    const title = screen.getByText(/anime night: spirits & stories/i); // i = ignore case

    // 3) Verify the hypothesis (assert expectations)
    expect(title).toBeInTheDocument();
  });

  it("shows max participants and reserved spots number", () => {
    // 1)
    render(
      <Provider store={fakeStore}>
        <BrowserRouter>
          <EventDetailCard {...fakeEventPropsToTry} />
        </BrowserRouter>
      </Provider>,
    );
    // 2)
    const participants = screen.getByText(/0\/3/i); // regex= ( open regex -> /num) + (\/ -> slash) +  (num/ -> close regex) + i

    // 3)
    expect(participants).toBeInTheDocument();
  });

  it("shows online event and not physical location when event type is ONLINE", () => {
    render(
      <Provider store={fakeStore}>
        <BrowserRouter>
          <EventDetailCard {...fakeEventPropsToTry} />
        </BrowserRouter>
      </Provider>,
    );

    const onlineText = screen.getByText(/online event/i);

    expect(onlineText).toBeInTheDocument();
    expect(screen.queryByText(/bologna/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/via/i)).not.toBeInTheDocument();
  });
});
