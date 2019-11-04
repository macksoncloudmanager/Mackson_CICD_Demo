<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<form method="post" onsubmit="return setVariables();">

    <div class="form-group">
        <label for="board">Board size:</label>
        <select class="form-control" name="board" id="board" title="Board size">
            <option value="8x8" selected>8x8 (10 min)</option>
            <option value="16x16">16x16 (40 min)</option>
            <option value="16x30">16x30 (99 min)</option>
            <option value="30x16">30x16 (99 min)</option>
            <option value="custom">Własne ustawienia</option>
        </select>
    </div>

    <div id="custom" class="grey">
        <div class="form-group">
            <label for="width">Width</label>
            <input type="text" name="width" class="form-control" title="Width" id="width" placeholder="Width"
                   disabled>
        </div>
        <div class="form-group">
            <label for="height">Height</label>
            <input type="text" name="height" class="form-control" title="Height" id="height" placeholder="Height"
                   disabled>
        </div>
        <div class="form-group">
            <label for="mines">Mines</label>
            <input type="text" name="mines" class="form-control" title="Mines" id="mines" placeholder="Number"
                   disabled>
        </div>
    </div>
    <button type="submit" class="btn btn-default">New Game</button>
</form>