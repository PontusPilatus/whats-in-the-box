using System.Text.Json;
using SquareApi.Models;

namespace SquareApi.Services
{
  public class SquareStateService
  {
    private readonly string _filePath;
    private readonly ILogger<SquareStateService> _logger;

    public SquareStateService(IConfiguration configuration, ILogger<SquareStateService> logger)
    {
      _filePath = configuration["SquareStateFilePath"] ?? "squareState.json";
      _logger = logger;

      // Ensure the file exists
      if (!File.Exists(_filePath))
      {
        File.WriteAllText(_filePath, JsonSerializer.Serialize(new SquareState()));
      }
    }

    public async Task<SquareState> GetSquareStateAsync()
    {
      try
      {
        if (!File.Exists(_filePath))
        {
          return new SquareState();
        }

        string json = await File.ReadAllTextAsync(_filePath);

        if (string.IsNullOrWhiteSpace(json))
        {
          return new SquareState();
        }

        return JsonSerializer.Deserialize<SquareState>(json) ?? new SquareState();
      }
      catch (Exception ex)
      {
        _logger.LogError(ex, "Error reading square state from file");
        return new SquareState();
      }
    }

    public async Task SaveSquareStateAsync(SquareState state)
    {
      try
      {
        string json = JsonSerializer.Serialize(state, new JsonSerializerOptions
        {
          WriteIndented = true
        });

        await File.WriteAllTextAsync(_filePath, json);
      }
      catch (Exception ex)
      {
        _logger.LogError(ex, "Error saving square state to file");
        throw;
      }
    }
  }
}