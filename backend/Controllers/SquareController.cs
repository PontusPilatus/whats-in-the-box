using Microsoft.AspNetCore.Mvc;
using SquareApi.Models;
using SquareApi.Services;

namespace SquareApi.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class SquareController : ControllerBase
  {
    private readonly SquareStateService _squareStateService;
    private readonly ILogger<SquareController> _logger;

    public SquareController(SquareStateService squareStateService, ILogger<SquareController> logger)
    {
      _squareStateService = squareStateService;
      _logger = logger;
    }

    [HttpGet]
    public async Task<ActionResult<SquareState>> GetSquares()
    {
      try
      {
        var state = await _squareStateService.GetSquareStateAsync();
        return Ok(state);
      }
      catch (Exception ex)
      {
        _logger.LogError(ex, "Error retrieving squares");
        return StatusCode(500, "An error occurred while retrieving squares");
      }
    }

    [HttpPost]
    public async Task<ActionResult> SaveSquares([FromBody] SquareState state)
    {
      try
      {
        await _squareStateService.SaveSquareStateAsync(state);
        return Ok();
      }
      catch (Exception ex)
      {
        _logger.LogError(ex, "Error saving squares");
        return StatusCode(500, "An error occurred while saving squares");
      }
    }

    [HttpPost("add")]
    public async Task<ActionResult> AddSquare([FromBody] Square square)
    {
      try
      {
        var state = await _squareStateService.GetSquareStateAsync();
        state.Squares.Add(square);
        await _squareStateService.SaveSquareStateAsync(state);
        return Ok(state);
      }
      catch (Exception ex)
      {
        _logger.LogError(ex, "Error adding square");
        return StatusCode(500, "An error occurred while adding a square");
      }
    }

    [HttpDelete]
    public async Task<ActionResult> ClearSquares()
    {
      try
      {
        await _squareStateService.SaveSquareStateAsync(new SquareState());
        return Ok();
      }
      catch (Exception ex)
      {
        _logger.LogError(ex, "Error clearing squares");
        return StatusCode(500, "An error occurred while clearing squares");
      }
    }
  }
}