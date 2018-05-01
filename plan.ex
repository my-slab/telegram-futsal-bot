defmodule Fixture do
  use GenServer

  alias __MODULE__, as: Fixture

  def start_link(state \\ %Fixture{}) do
    GenServer.start_link(Fixture, state, name: Fixture)
  end

  defp init(state), do: {:ok, state}
end

defmodule Fixture.Location do
  defstruct id: nil, name: ""
end

defmodule Fixture.Team do
  defstruct id: nil, name: ""
end

defmodule Fixture.Fixture do
  defstruct Fixture do
    start: ,
    location: %Fixture.Location{},
    teams: {
      %Fixture.Team{},
      %Fixture.Team{}
    },
    availability: %Fixture.Availablity{}
  end
end

defmodule Fixture.Availability do
  defstruct in: [], maybe: [], out: []
end
