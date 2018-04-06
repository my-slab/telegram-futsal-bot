defmodule Futsal.Fixture do
  
  use Ecto.Schema

  import Ecto.Changeset

  schema "fixtures" do
    field(:away_team, :string)
    field(:court, :string)
    field(:date, :utc_datetime)
    field(:home_team, :string)
  end

  def create_changeset(%{} = params) do
    %Fixture{}
    |> cast(params, [:away_team, :court, :date, :home_team])
    |> validate_required([:away_team, :court, :date, :home_team])
  end
end
