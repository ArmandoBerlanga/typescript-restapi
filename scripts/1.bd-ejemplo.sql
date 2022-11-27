CREATE DATABASE WeatherEntries;
USE WeatherEntries;
GO

GO
CREATE SCHEMA Info
GO

-- ...

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Diary' AND xtype='U')
BEGIN
    CREATE TABLE Info.Diary (
        ID INT NOT NULL PRIMARY KEY IDENTITY(1,1),
        [Date] DATE NOT NULL,
        Weather VARCHAR(255) NOT NULL,
        Visibility VARCHAR(255) NOT NULL,
        Comment VARCHAR(255) NOT NULL,
    );
END
GO

-- ...

GO
IF OBJECT_ID('Info.AddDiaryEntry', 'P') IS NOT NULL
    DROP PROCEDURE Info.AddDiaryEntry;
GO
CREATE PROCEDURE Info.AddDiaryEntry (
    @ID INT = NULL,
    @Date DATE = NULL,
    @Weather VARCHAR(255) = NULL,
    @Visibility VARCHAR(255) = NULL,
    @Comment VARCHAR(255) = NULL
) AS
BEGIN
    IF @ID IS NULL
        INSERT INTO Info.Diary ([Date], Weather, Visibility, Comment)
        VALUES (@Date, @Weather, @Visibility, @Comment)
    ELSE
        UPDATE Info.Diary
        SET [Date] = @Date, Weather = @Weather, Visibility = @Visibility, Comment = @Comment
        WHERE ID = @ID

    SELECT ID as id, [Date] as date, Weather as weather, Visibility as visibility, Comment as comment
    FROM Info.Diary 
    WHERE ISNULL(@ID, SCOPE_IDENTITY()) = ID
END
GO

-- ...

GO
IF OBJECT_ID('Info.GetDiaryEntry', 'P') IS NOT NULL
    DROP PROCEDURE Info.GetDiaryEntry;
GO
CREATE PROCEDURE Info.GetDiaryEntry
    @ID INT = NULL
AS
BEGIN
    SELECT ID as id, [Date] as date, Weather as weather, Visibility as visibility, Comment as comment
    FROM Info.Diary
    WHERE ISNULL(@ID, ID) = ID
END
GO

-- ...

INSERT INTO Info.Diary ([Date], Weather, Visibility, Comment)
VALUES ('2019-01-01', 'sunny', 'good', 'good day'),
       ('2019-01-02', 'cloudy', 'average', 'bad day'),
       ('2019-01-03', 'rainy', 'good', 'bad day'),
       ('2019-01-04', 'windy', 'poor', 'normal day')
